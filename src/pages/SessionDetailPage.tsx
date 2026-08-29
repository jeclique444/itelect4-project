// src/pages/SessionDetailPage.tsx
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router";
import type { ApiSession } from "../types/index";
import SessionCard from "../components/SessionCard";
import { fetchSessionById } from "../api/client";

function SessionDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isPending, isError, error } = useQuery<ApiSession>({
    queryKey: ["sessions", id],
    queryFn: () => fetchSessionById(id!),
    enabled: id !== undefined,
  });

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading session...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-rose-50 p-6 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400">
        <p className="font-medium">{error.message}</p>
        <p className="mt-1 text-sm">Session with ID "{id}" not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header — walang button dito */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Session Details
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          View and manage this tutoring session
        </p>
      </div>

      {/* Session Card */}
      <div className="max-w-2xl">
        <SessionCard session={data as any} variant="default" />
      </div>

      {/* Back to Sessions Button — NASA BABA */}
      <div className="flex justify-start pt-2">
        <Link
          to="/sessions"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-10 py-4 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95 dark:from-blue-600 dark:to-indigo-600"
        >
          Back to Sessions
        </Link>
      </div>
    </div>
  );
}

export default SessionDetailPage;