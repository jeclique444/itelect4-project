// src/pages/SubmissionsPage.tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiSubmission, ApiCourse } from "../types/index";
import { submissionSchema } from "../schemas/submissionSchema";
import type { SubmissionFormValues } from "../schemas/submissionSchema";
import SubmissionBadge from "../components/SubmissionBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchSubmissions, createSubmission, fetchCourses } from "../api/client";

function SubmissionsPage() {
  const queryClient = useQueryClient();

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    mode: "onBlur",
    defaultValues: { courseCode: "", repoUrl: "" },
  });

  // Query for courses
  const courses = useQuery<ApiCourse[]>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  // Query for submissions
  const { data, isPending, isError, error } = useQuery<ApiSubmission[]>({
    queryKey: ["submissions"],
    queryFn: fetchSubmissions,
  });

  // Mutation
  const addSubmission = useMutation({
    mutationFn: createSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      reset();
    },
  });

  const onSubmit = (values: SubmissionFormValues): void => {
    addSubmission.mutate({
      studentId: 1,
      courseCode: values.courseCode,
      repoUrl: values.repoUrl,
      submittedAt: new Date().toISOString(),
    });
  };

  // Loading State
  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading submissions...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="rounded-xl bg-rose-50 p-6 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400">
        <p className="font-medium">{error.message}</p>
        <p className="mt-1 text-sm">Is json-server running on port 3001?</p>
      </div>
    );
  }

  const submissions = data ?? [];
  const hasSubmissions = submissions.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Submissions
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {hasSubmissions
              ? `${submissions.length} submission${submissions.length !== 1 ? "s" : ""} submitted`
              : "No submissions yet"}
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-blue-100 px-3.5 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          {submissions.length} total
        </span>
      </div>

      {/* Form Section */}
      <div className="rounded-2xl border-2 border-gray-200/80 bg-white/90 p-6 shadow-lg dark:border-gray-600/80 dark:bg-gray-800/90">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Submit Your Work
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* Course Dropdown */}
          <div className="space-y-1.5">
            <Label htmlFor="courseCode" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Course
            </Label>
            <select
              id="courseCode"
              {...register("courseCode")}
              className="w-full rounded-lg border-2 border-gray-200/80 bg-white/90 px-4 py-2.5 text-gray-900 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/20 dark:border-gray-600/80 dark:bg-gray-800/90 dark:text-white dark:focus:border-blue-500"
            >
              <option value="">Select a course...</option>
              {courses.data?.map((c) => (
                <option key={c.id} value={c.code}>
                  {c.code} - {c.title}
                </option>
              ))}
            </select>
            {errors.courseCode && (
              <p className="text-sm text-rose-600 dark:text-rose-400">{errors.courseCode.message}</p>
            )}
          </div>

          {/* Repository URL Input */}
          <div className="space-y-1.5">
            <Label htmlFor="repoUrl" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Repository URL
            </Label>
            <Input
              id="repoUrl"
              {...register("repoUrl")}
              aria-invalid={errors.repoUrl ? true : undefined}
              placeholder="https://github.com/your-username/your-repo"
              className="h-11 border-2 border-gray-200/80 bg-white/90 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 dark:border-gray-600/80 dark:bg-gray-800/90 dark:focus:border-blue-500"
            />
            {errors.repoUrl && (
              <p className="text-sm text-rose-600 dark:text-rose-400">{errors.repoUrl.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={addSubmission.isPending}
            className="h-11 w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95 disabled:opacity-50 dark:from-blue-600 dark:to-indigo-600 sm:w-auto sm:px-8"
          >
            {addSubmission.isPending ? "Submitting..." : "Submit Assignment"}
          </Button>
        </form>

        {/* Mutation Error */}
        {addSubmission.isError && (
          <p className="mt-3 text-sm text-rose-600 dark:text-rose-400">
            {addSubmission.error.message}
          </p>
        )}
      </div>

      {/* Submissions Grid */}
      {!hasSubmissions ? (
        <div className="rounded-xl bg-gray-50 p-8 text-center dark:bg-gray-800/50">
          <p className="text-gray-500 dark:text-gray-400">No submissions yet.</p>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
            Submit your first assignment above!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {submissions.map((s) => (
            <SubmissionBadge key={s.id} submission={s}>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Course: {s.courseCode}
              </p>
            </SubmissionBadge>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubmissionsPage;