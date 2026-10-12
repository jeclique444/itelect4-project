// src/pages/SessionsPage.tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router";
import type { ApiSession, NewSession } from "../types/index";
import SessionCard from "../components/SessionCard";
import useUiStore from "../store/uiStore";
import usePrevious from "../hooks/usePrevious";
import { fetchSessions, createSession } from "../api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Schema for adding a session
const sessionSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.number().min(15, "At least 15 minutes").max(480, "Max 480 minutes"),
  capacity: z.number().min(1, "At least 1 student").max(50, "Max 50 students"),
  schedule: z.string().min(1, "Schedule is required"),
  price: z.number().min(0, "Price cannot be negative"),
  location: z.string().min(1, "Location is required"),
});

type SessionFormValues = z.infer<typeof sessionSchema>;

function SessionsPage() {
  const queryClient = useQueryClient();
  const searchTerm = useUiStore((state) => state.searchTerm);
  const setSearchTerm = useUiStore((state) => state.setSearchTerm);
  const previousSearch = usePrevious(searchTerm);

  const { data, isPending, isError, error } = useQuery<ApiSession[]>({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SessionFormValues>({
    resolver: zodResolver(sessionSchema),
    mode: "onBlur",
    defaultValues: {
      subject: "",
      description: "",
      duration: 60,
      capacity: 5,
      schedule: "",
      price: 0,
      location: "",
    },
  });

  const addSession = useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      reset();
    },
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const filteredSessions = data?.filter((s) =>
    s.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) ?? [];

  // The form values are the request body, exactly. No invented
  // tutorId (comes off the token) and no invented schedule default
  // (comes from the schema) -- just the fields the form controls.
  const onSubmit = (values: SessionFormValues): void => {
    addSession.mutate(values as unknown as NewSession);
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading sessions...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-rose-50 p-6 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400">
        <p className="font-medium">{error.message}</p>
        <p className="mt-1 text-sm">
          Check that the API is reachable and your token is still valid.
        </p>
      </div>
    );
  }

  const totalSessions = data?.length || 0;
  const filteredCount = filteredSessions.length;
  const isSearching = searchTerm.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Sessions
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isSearching
              ? `Showing ${filteredCount} of ${totalSessions} session${totalSessions !== 1 ? "s" : ""}`
              : `${filteredCount} session${filteredCount !== 1 ? "s" : ""} available`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3.5 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            {isSearching ? `${filteredCount} / ${totalSessions}` : `${totalSessions}`}
          </span>
        </div>
      </div>

      {/* Create Session Form */}
      <div className="rounded-2xl border-2 border-gray-200/80 bg-white/90 p-6 shadow-lg dark:border-gray-600/80 dark:bg-gray-800/90">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Create New Session
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Subject
            </Label>
            <Input id="subject" {...register("subject")} placeholder="Mathematics" className="h-11" />
            {errors.subject && (
              <p className="text-sm text-rose-600 dark:text-rose-400">{errors.subject.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Location
            </Label>
            <Input id="location" {...register("location")} placeholder="Library Room MB 301" className="h-11" />
            {errors.location && (
              <p className="text-sm text-rose-600 dark:text-rose-400">{errors.location.message}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </Label>
            <Input id="description" {...register("description")} placeholder="Algebra review for midterm" className="h-11" />
            {errors.description && (
              <p className="text-sm text-rose-600 dark:text-rose-400">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="schedule" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Schedule
            </Label>
            <Input id="schedule" type="datetime-local" {...register("schedule")} className="h-11" />
            {errors.schedule && (
              <p className="text-sm text-rose-600 dark:text-rose-400">{errors.schedule.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="duration" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Duration (minutes)
            </Label>
            <Input
              id="duration"
              type="number"
              {...register("duration", { valueAsNumber: true })}
              className="h-11"
            />
            {errors.duration && (
              <p className="text-sm text-rose-600 dark:text-rose-400">{errors.duration.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="capacity" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Capacity
            </Label>
            <Input
              id="capacity"
              type="number"
              {...register("capacity", { valueAsNumber: true })}
              className="h-11"
            />
            {errors.capacity && (
              <p className="text-sm text-rose-600 dark:text-rose-400">{errors.capacity.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="price" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Price (PHP)
            </Label>
            <Input
              id="price"
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="h-11"
            />
            {errors.price && (
              <p className="text-sm text-rose-600 dark:text-rose-400">{errors.price.message}</p>
            )}
          </div>

          <div className="flex items-end sm:col-span-2">
            <Button
              type="submit"
              disabled={addSession.isPending}
              className="h-11 w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95 disabled:opacity-50 sm:w-auto sm:px-8"
            >
              {addSession.isPending ? "Creating..." : "Create Session"}
            </Button>
          </div>
        </form>

        {addSession.isError && (
          <p className="mt-3 text-sm text-rose-600 dark:text-rose-400">
            {addSession.error.message}
          </p>
        )}
      </div>

      {/* Search Section */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search sessions by subject or description..."
          className="w-full rounded-xl border-2 border-gray-200/80 bg-white/90 py-3.5 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/20 dark:border-gray-600/80 dark:bg-gray-800/90 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {previousSearch !== undefined && previousSearch !== searchTerm && searchTerm && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Previous search: <span className="font-medium">"{previousSearch}"</span>
        </p>
      )}

      {filteredCount === 0 && searchTerm && (
        <div className="rounded-xl bg-gray-50 p-8 text-center dark:bg-gray-800/50">
          <p className="text-gray-500 dark:text-gray-400">
            No sessions found matching <span className="font-medium text-gray-700 dark:text-gray-300">"{searchTerm}"</span>
          </p>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
            Try adjusting your search terms
          </p>
        </div>
      )}

      {filteredCount > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSessions.map((s) => (
            <Link key={s.id} to={`/sessions/${s.id}`} className="block transition-opacity hover:opacity-100">
              <SessionCard session={s as any} variant="default" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SessionsPage;