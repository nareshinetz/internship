# Student Identity and Enrollment Architecture

Status: approved target architecture; not yet implemented.

This document is the architecture contract for student identity, internship
enrollment, account claiming, and payments in the internship application at
`D:\inetz`. It also records the narrow shared-database boundary with the
separate course application at `D:\inetz_page\my-company-site`.

Do not treat this document as evidence that a migration has already run. The
current application still uses `src/models/Student.ts` and its existing API
flows until an explicit implementation and data migration are completed.

## Repository boundary

- `D:\inetz` is the internship application.
- `D:\inetz_page\my-company-site` is the six-month course application.
- Both applications use the same MongoDB database.
- Internship work must not modify the course repository unless the task
  explicitly includes it.
- Both applications must ultimately use an identical `User` schema because
  they share the `users` collection. Application authorization, not divergent
  Mongoose schemas, decides which roles can use each website.

## Approved collection ownership

```text
users
  Shared identity, login credentials, contact details, permanent student ID,
  college/degree, roles, and optional employer fields.

programs
  Internship catalogue owned by the internship application.

courses
  Six-month course catalogue owned by the course application.

enrollments
  Shared service records for internships, courses, and certificate-only
  students, including billing, embedded installments, and certificate state.

razorpayorders
  Razorpay order lock, verification, audit, idempotency, and refund state for
  one enrollment.

studentprofiles
  Course/placement profile only: resume, GitHub, LinkedIn, avatar, and skills.
  It also owns placement eligibility/support and outcome so assessment-cleared
  placement-only students do not need a fake Enrollment. The internship
  application does not need to query this collection.

jobs / applications
  Course placement opportunities and applications. Applications reference a
  user, the qualifying course enrollment, and a job.
```

The legacy `students` collection is the migration source. It is not the target
owner of identity or enrollment data.

## Relationship and identifiers

```text
User (_id, permanent studentId)
  |-- Enrollment (_id, type=internship) --> Program (_id)
  |-- Enrollment (_id, type=course)     --> Course (_id)
  |-- Enrollment (_id, type=certificate; no offering relationship)
  |-- StudentProfile (one per user; course/placement only)
  `-- RazorpayOrder --> exact Enrollment (_id)
```

- MongoDB `_id` is the internal primary key for every collection.
- `User.studentId` is the permanent, human-readable student identity. It is
  assigned once when the person first receives an enrollment and is never
  reused or changed.
- `Enrollment._id` identifies one internship or course enrollment. There is no
  separate human-readable enrollment number for now.
- A user can own many enrollments and keeps the same `studentId` for all of
  them.
- Enrollment records with financial or certificate history are cancelled or
  archived, never hard-deleted in normal operation.

## Shared User contract

The shared `User` schema supports these roles:

```text
public | student | employer | admin
```

The internship application authorizes only `student` and `admin`. The course
application may use all four roles. Optional employer fields may remain on the
shared schema but are not populated for internship students.

Approved fields:

```ts
{
  _id: ObjectId;
  studentId?: string;            // unique when present, immutable
  name: string;
  email?: string;                // absent until an admin-created account is claimed
  password?: string;             // bcrypt hash, select:false
  phone?: string;                // normalized, unique when present
  phoneVerifiedAt?: Date;        // presence means phone ownership was verified
  college?: string;
  degree?: string;
  role: "public" | "student" | "employer" | "admin"; // defaults to public
  provider?: "credentials" | "google";
  image?: string;
  companyName?: string;          // employer only
  companyWebsite?: string;       // employer only
  isApproved?: boolean;          // employer only
  isExclusive?: boolean;         // course placement-only clearance
  createdAt: Date;
  updatedAt: Date;
}
```

Do not store missing email, phone, or password values as empty strings or
`null`; omit the fields. Passwords exist only in `users` and are never copied
to enrollment documents.

Required indexes:

```ts
UserSchema.index(
  { phone: 1 },
  {
    unique: true,
    partialFilterExpression: { phone: { $type: "string" } },
  },
);

UserSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $type: "string" } },
  },
);

UserSchema.index(
  { studentId: 1 },
  {
    unique: true,
    partialFilterExpression: { studentId: { $type: "string" } },
  },
);
```

The partial indexes allow accounts to omit email, phone, or student ID while
prohibiting duplicate real values. Existing indexes and duplicate/empty data
must be audited before these indexes are installed.

`isExclusive`, resume, GitHub, LinkedIn, avatar, and skills are not internship
identity fields. `isExclusive` is retained as the course application's
placement-only clearance flag and must not affect internship authorization.

## Shared Enrollment contract

One enrollment represents one user receiving an internship, course, or
certificate service. It is not the student's identity record.

```ts
{
  _id: ObjectId;
  userId: ObjectId;              // required, ref User
  type: "internship" | "course" | "certificate";
  offeringId?: ObjectId;         // required for internship/course only
  offeringSlug?: string;         // required for internship/course only
  certificateNumber?: string;    // required for certificate only
  joinedAt: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  domain: string;
  duration: string;
  status: "payment_pending" | "active" | "completed" | "cancelled";
  totalBilling: number;
  installments: Installment[];
  totalCollection: number;       // derived from installments
  pendingAmount: number;         // derived from billing minus collection
  feesStatus: "Pending" | "Clear";
  certificateStatus: "Pending" | "Issued";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

There is intentionally no `offeringTitle`, batch key, duplicate student
profile, or extra enrollment ID. Internship/course title is loaded from
`Program` or `Course` using `offeringId`. Certificate-only records have no
`offeringId` or `offeringSlug` for now. Batch and certificate-offering support
are deferred until the product has those concepts.

Required uniqueness and query indexes:

```ts
EnrollmentSchema.index(
  { userId: 1, type: 1, offeringId: 1 },
  {
    unique: true,
    partialFilterExpression: { offeringId: { $type: "objectId" } },
  },
);

EnrollmentSchema.index(
  { certificateNumber: 1 },
  {
    unique: true,
    partialFilterExpression: { certificateNumber: { $type: "string" } },
  },
);

EnrollmentSchema.index(
  { type: 1, offeringSlug: 1, status: 1, joinedAt: -1 },
);

EnrollmentSchema.index(
  { userId: 1, status: 1, joinedAt: -1 },
);
```

The compound unique index permits one user to attend multiple different
internships and/or courses while preventing duplicate enrollment in the same
offering. Repeating the same offering is not supported until a real batch or
cohort concept exists.

Installments remain embedded in their enrollment. Their permitted payment
methods cover Cash, GPay, UPI, Card, Netbanking, Wallet, EMI, and Razorpay
Online. The enrollment save hook derives `totalCollection`, `pendingAmount`,
and `feesStatus`; routes must not maintain competing totals.

## Admin-created student and account-claim flow

The admin does not create a legacy Student document without an identity.
Instead:

```text
Admin enters name, normalized phone, college, degree, and offering
  -> find User by unique phone
  -> create User without email/password if absent
  -> assign permanent studentId if absent
  -> create Enrollment with User._id
```

The phone entered by an admin is not considered verified. Later account claim:

```text
Student enters phone
  -> send and verify OTP
  -> find the existing User by normalized phone
  -> collect a unique email and password
  -> set email, bcrypt-hashed password, provider=credentials,
     and phoneVerifiedAt
  -> issue login session
  -> dashboard loads Enrollment documents by User._id
```

Use a document `save()` or explicitly hash the password in the claim service;
do not place a plain password in `findByIdAndUpdate` and bypass the existing
pre-save hashing hook. Phone matching locates the account, OTP proves ownership,
and `Enrollment.userId` is the permanent relationship after creation.

If the phone already belongs to a user, the admin reuses that user and creates
only another enrollment. No `unlinkedStudent` object or fake email/password is
needed in the approved flow.

## Direct online enrollment flow

```text
Verify phone by OTP
  -> find existing User by phone or create one
  -> collect/validate email and password when needed
  -> load Program or Course by server-trusted offeringId/slug
  -> create Enrollment with authoritative price and offering details
  -> create RazorpayOrder for Enrollment._id
  -> record a captured payment in that enrollment's installments
```

The browser never establishes user identity, official price, captured payment
state, or enrollment ownership.

## Razorpay ownership and flow

`RazorpayOrder.studentId` is replaced by `enrollmentId` in the target model.
The order also stores `userId` for ownership/audit.

```ts
{
  _id: ObjectId;
  userId: ObjectId;              // ref User
  enrollmentId: ObjectId;        // ref Enrollment
  lockKey?: string;              // one active order lock
  orderId?: string;              // unique when present
  paymentId?: string;            // unique when present
  amount: number;
  currency: "INR";
  status: "creating" | "created" | "processed" | "expired" | "failed";
  expiresAt: Date;
  processedAt?: Date;
  excessAmount: number;
  refundStatus: "not_required" | "required" | "refunded";
  refundId?: string;
}
```

Payment flow:

```text
Authenticated user requests payment for enrollmentId
  -> server loads Enrollment by {_id, userId}
  -> server validates requested installment against pendingAmount
  -> acquire RazorpayOrder lock and create provider order
  -> browser verification or webhook calls the one shared payment recorder
  -> recorder fetches authoritative Razorpay order/payment
  -> require captured INR payment with matching IDs and amount
  -> append one idempotent installment to the exact Enrollment
  -> Enrollment save hook recalculates totals
  -> mark RazorpayOrder processed and release active lock
```

Preserve the existing unique lock/order/payment indexes, refund fields, and
single-recorder invariant documented in `PROJECT_KNOWLEDGE.md`.

## Internship admin queries

Count active/non-cancelled students for one internship:

```ts
Enrollment.countDocuments({
  type: "internship",
  offeringSlug,
  status: { $ne: "cancelled" },
});
```

List students and their shared identity:

```ts
Enrollment.find({ type: "internship", offeringSlug })
  .populate("userId", "studentId name email phone college degree")
  .sort({ joinedAt: -1 });
```

For sensitive mutations such as payment or certificate issuance, address the
enrollment by `_id` and independently authorize the acting account. Slug-only
queries are suitable for admin grouping, not student ownership checks.

## Course boundary (do not mix into internship features)

Course enrollments share `users`, `enrollments`, and `razorpayorders` but use:

```text
type = course
offeringId -> Course._id
offeringSlug -> Course.slug
duration = 6 Months (from the Course record)
```

On first course enrollment, the course application creates or upserts one
`StudentProfile` for the user. It stores avatar, resume, GitHub, LinkedIn,
skills, and placement support/outcome. Course eligibility may be established
by a course Enrollment.

Legacy records whose duration is exactly `Assessment Cleared` are a distinct
placement-only category: migrate them to a User with `isExclusive=true` plus a
StudentProfile, and do not create an internship or course Enrollment. Their job
applications reference `userId` and `jobId`; `enrollmentId` is optional because
no qualifying enrollment exists. Course authorization must allow placement
access when either a qualifying course Enrollment exists or the User has
`isExclusive=true`. Keep the applied resume URL as an application-time
snapshot.

Employer/public roles, employer profiles, jobs, applications, placement UI,
and `StudentProfile` are course features. Do not add them to internship pages
or flows merely because the collections share a database.

## Approved business categories

There are four business categories, but only three Enrollment types:

```text
internship
  -> Enrollment(type=internship, offeringId=Program._id, offeringSlug required)

course
  -> Enrollment(type=course, offeringId=Course._id, offeringSlug required)
  -> StudentProfile(type=course)

certificate
  -> Enrollment(type=certificate, certificateNumber required)
  -> no Program/Course offering relationship or slug for now

assessment_cleared
  -> User(isExclusive=true)
  -> StudentProfile(type=assessment_cleared)
  -> placement access, but no Enrollment
```

Legacy `duration="Assessment Cleared"` is a migration marker only and is not
copied as a duration. Legacy `domain="certificate"` maps to a certificate-type
Enrollment. Actual durations such as `1 Week`, `2 Weeks`, and `6 Months` remain
durations; they are never used as category names in the target model.

## Migration constraints

Migration is a separate, explicitly authorized task:

1. Export and back up `users`, `students`, `razorpayorders`, and dependent
   records before writes.
2. Audit duplicate/empty email and phone values plus current MongoDB indexes.
3. Normalize phone values before matching.
4. Match or create one User per real person; never invent placeholder emails.
5. Convert each legacy Student record into an Enrollment and preserve every
   installment, total, certificate state, and date.
6. Classify each record using reviewed data; do not guess solely from duration
   or the presence of `userId`. The approved legacy exceptions are exact
   `duration="Assessment Cleared"`, which maps to placement-only User +
   StudentProfile and produces no Enrollment, and case-insensitive
   `domain="certificate"`, which maps to a certificate-type Enrollment.
7. Repoint Razorpay orders and dependent placement/application records to the
   correct enrollment.
8. Compare record counts and financial totals before and after migration.
9. Deploy compatible readers/writers to both applications in a coordinated
   release before retiring the legacy `students` collection.

Until that work is completed, preserve the current production models and
payment invariants. Do not partially switch one application to the target
schema while the other still writes incompatible records.

