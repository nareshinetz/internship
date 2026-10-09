"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import StudentHeaderControls from "./students/StudentHeaderControls";
import StudentTable, { StudentRecord } from "./students/StudentTable";
import StudentPagination from "./students/StudentPagination";
import AddStudentModal from "./students/AddStudentModal";
import EditStudentModal from "./students/EditStudentModal";

const DEFAULT_DURATIONS = ["1 Week", "2 Weeks", "1 Month", "2 Months", "3 Months", "6 Months"];

export default function StudentsTab() {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [availableDomains, setAvailableDomains] = useState<string[]>(["All"]);
  const [availableDurations, setAvailableDurations] = useState<string[]>(["All", ...DEFAULT_DURATIONS]);
  const [loading, setLoading] = useState(true);

  // Summary Metrics State
  const [summary, setSummary] = useState({
    totalStudents: 0,
    totalCollected: 0,
    totalPending: 0,
    duesCount: 0,
    clearCount: 0,
  });

  // Filter States
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [durationFilter, setDurationFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("current");
  const [feePendingOnly, setFeePendingOnly] = useState(false);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const latestRequest = useRef(0);

  // Modal States
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch dynamic tracks to populate domain dropdown list
  const fetchAvailableTracks = useCallback(async () => {
    try {
      let res = await fetch("/api/tracks");
      if (!res.ok) {
        res = await fetch("/api/programs");
      }

      if (res.ok) {
        const rawData = await res.json();
        const list: any[] = Array.isArray(rawData)
          ? rawData
          : rawData.programs || rawData.data || [];

        const titles = Array.from(
          new Set(list.map((item) => item.title?.trim()).filter(Boolean))
        ) as string[];

        if (titles.length > 0) {
          setAvailableDomains(["All", ...titles]);
        }
      }
    } catch (err) {
      console.error("Failed to load tracks for domains list:", err);
    }
  }, []);

  useEffect(() => {
    fetchAvailableTracks();
  }, [fetchAvailableTracks]);

  // Fetch students with normalized filters
  const fetchStudents = useCallback(async () => {
    const request = ++latestRequest.current;
    setLoading(true);
    try {
      const queryParams: Record<string, string> = {
        search: debouncedSearch.trim(),
        page: page.toString(),
        limit: "15",
        status: statusFilter,
      };

      // Case-insensitive check: only append if not 'all'
      if (domainFilter.trim().toLowerCase() !== "all") {
        queryParams.domain = domainFilter.trim();
      }

      if (durationFilter.trim().toLowerCase() !== "all") {
        queryParams.duration = durationFilter.trim();
      }
      if (feePendingOnly) queryParams.feesPending = "true";

      if (fromDate) queryParams.fromDate = fromDate;
      if (toDate) queryParams.toDate = toDate;
      if (joiningDate) queryParams.joiningDate = joiningDate;

      const query = new URLSearchParams(queryParams);
      const res = await axios.get(`/api/students?${query.toString()}`);
      if (request !== latestRequest.current) return;

      if (res.data.success) {
        setStudents(res.data.students || []);

        if (res.data.summary) {
          setSummary(res.data.summary);
        }

        // Merge backend-provided domains if available
        if (Array.isArray(res.data.availableDomains) && res.data.availableDomains.length > 0) {
          setAvailableDomains((prev) => {
            const combined = Array.from(
              new Set([...prev, ...res.data.availableDomains.map((d: string) => d.trim())])
            );
            return combined.filter((d) => d.toLowerCase() !== "all").length > 0
              ? ["All", ...combined.filter((d) => d.toLowerCase() !== "all")]
              : ["All"];
          });
        }
        if (Array.isArray(res.data.availableDurations) && res.data.availableDurations.length > 0) {
          setAvailableDurations(Array.from(new Set(res.data.availableDurations)) as string[]);
        }

        if (res.data.pagination) {
          setTotalPages(res.data.pagination.totalPages || 1);
        }
      }
    } catch (err) {
      if (request === latestRequest.current) console.error("Failed to load students:", err);
    } finally {
      if (request === latestRequest.current) setLoading(false);
    }
  }, [debouncedSearch, domainFilter, durationFilter, statusFilter, feePendingOnly, fromDate, toDate, joiningDate, page]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleDomainChange = (val: string) => {
    setDomainFilter(val);
    setPage(1);
  };

  const handleDurationChange = (val: string) => {
    setDurationFilter(val);
    setPage(1);
  };

  const handleJoiningDateChange = (val: string) => {
    setJoiningDate(val);
    setPage(1);
  };

  const handleFromDateChange = (val: string) => {
    setFromDate(val);
    setPage(1);
  };

  const handleToDateChange = (val: string) => {
    setToDate(val);
    setPage(1);
  };

  const handleClearDates = () => {
    setFromDate("");
    setToDate("");
    setPage(1);
  };

  const handleOpenEditModal = (student: StudentRecord) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <StudentHeaderControls
        summary={summary}
        search={search}
        onSearchChange={handleSearchChange}
        domainFilter={domainFilter}
        onDomainChange={handleDomainChange}
        availableDomains={availableDomains}
        durationFilter={durationFilter}
        statusFilter={statusFilter}
        onStatusChange={(value) => { setStatusFilter(value); setPage(1); }}
        feePendingOnly={feePendingOnly}
        onOutstandingBalanceClick={() => { setFeePendingOnly((value) => !value); setPage(1); }}
        onClearFeeFilter={() => { setFeePendingOnly(false); setPage(1); }}
        onDurationChange={handleDurationChange}
        availableDurations={availableDurations}
        fromDate={fromDate}
        onFromDateChange={handleFromDateChange}
        toDate={toDate}
        onToDateChange={handleToDateChange}
        onClearDates={handleClearDates}
        joiningDate={joiningDate}
        onJoiningDateChange={handleJoiningDateChange}
        loading={loading}
        onRefresh={fetchStudents}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      <StudentTable
        students={students}
        loading={loading}
        onOpenEditModal={handleOpenEditModal}
      />

      <StudentPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchStudents}
      />

      <EditStudentModal
        isOpen={isEditModalOpen}
        student={selectedStudent}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={fetchStudents}
      />
    </div>
  );
}
