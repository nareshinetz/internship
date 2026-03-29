export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="mt-3 max-w-prose text-zinc-600 dark:text-zinc-300">
        Add your company story, mission, and team info here.
      </p>
    </div>
  );
}









// "use client";

// import { MapPin, Layers, Clock, Building2 } from "lucide-react";

// export default function LocationSection() {
//   return (
//     <section className="w-full bg-gray-50 py-16 sm:py-20">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
//         <div className="grid gap-10 lg:grid-cols-2 items-center">
          
//           {/* ───── LEFT IMAGE ───── */}
//           <div className="relative">
//             <img
//               src="/tidel-park.jpg" // 👉 replace with your image
//               alt="TIDEL Park Chennai"
//               className="w-full h-full object-cover rounded-2xl shadow-md"
//             />

//             {/* Label */}
//             <div className="absolute bottom-4 left-4 bg-white rounded-full px-4 py-2 shadow flex items-center gap-2">
//               <MapPin className="h-4 w-4 text-green-700" />
//               <span className="text-sm font-medium text-gray-800">
//                 TIDEL Park, Chennai
//               </span>
//             </div>
//           </div>

//           {/* ───── RIGHT CONTENT ───── */}
//           <div className="space-y-6">

//             {/* Top Card */}
//             <div className="flex gap-4 rounded-2xl border bg-white p-5 shadow-sm">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-900 text-white">
//                 <MapPin className="h-6 w-6" />
//               </div>

//               <div>
//                 <h3 className="font-semibold text-lg text-gray-900">
//                   📍 TIDEL Park, Tharamani, Chennai
//                 </h3>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Train daily inside a <span className="font-semibold text-green-700">real IT ecosystem</span> – not classrooms in commercial buildings.
//                 </p>
//               </div>
//             </div>

//             {/* Feature Grid */}
//             <div className="grid gap-4 sm:grid-cols-2">

//               {/* Card 1 */}
//               <div className="rounded-2xl border bg-white p-5 shadow-sm">
//                 <Layers className="h-6 w-6 text-green-900 mb-3" />
//                 <h4 className="font-semibold text-gray-900">
//                   Professional Environment
//                 </h4>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Experience working in India's top IT park
//                 </p>
//               </div>

//               {/* Card 2 */}
//               <div className="rounded-2xl border bg-white p-5 shadow-sm">
//                 <Clock className="h-6 w-6 text-green-900 mb-3" />
//                 <h4 className="font-semibold text-gray-900">
//                   Industry Exposure
//                 </h4>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Network with professionals and companies
//                 </p>
//               </div>

//               {/* Card 3 */}
//               <div className="rounded-2xl border bg-white p-5 shadow-sm">
//                 <MapPin className="h-6 w-6 text-green-900 mb-3" />
//                 <h4 className="font-semibold text-gray-900">
//                   Prime Location
//                 </h4>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Easy access via metro and public transport
//                 </p>
//               </div>

//               {/* Card 4 */}
//               <div className="rounded-2xl border bg-white p-5 shadow-sm">
//                 <Building2 className="h-6 w-6 text-green-900 mb-3" />
//                 <h4 className="font-semibold text-gray-900">
//                   Modern Facilities
//                 </h4>
//                 <p className="text-sm text-gray-600 mt-1">
//                   State-of-the-art infrastructure and amenities
//                 </p>
//               </div>

//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
