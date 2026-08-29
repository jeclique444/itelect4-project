import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiSubmission, Course } from "../types/index";
import { submissionSchema } from "../schemas/submissionSchema";
import type { SubmissionFormValues } from "../schemas/submissionSchema";
import SubmissionBadge from "../components/SubmissionBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchSubmissions, createSubmission, fetchCourses } from "../api/client";

function SubmissionsPage() {
  const queryClient = useQueryClient();

  // React Hook Form - holds values, runs schema, stores errors
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

  // Query for courses (for dropdown)
  const courses = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  // Query for submissions
  const { data, isPending, isError } = useQuery<ApiSubmission[]>({
    queryKey: ["submissions"],
    queryFn: fetchSubmissions,
  });

  // Mutation - same as Session 7
  const addSubmission = useMutation({
    mutationFn: createSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      reset(); // clears every field at once
    },
  });

  // handleSubmit only calls this after the schema passes
  const onSubmit = (values: SubmissionFormValues): void => {
    addSubmission.mutate({
      studentId: 1,
      courseCode: values.courseCode,
      repoUrl: values.repoUrl,
      submittedAt: new Date().toISOString(),
    });
  };

  if (isPending) {
    return <div className="animate-pulse p-6">Loading submissions...</div>;
  }

  if (isError) {
    return <div className="rounded-lg bg-red-50 p-4 text-red-700">Could not load submissions.</div>;
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">My Submissions</h2>

      {/* Form with handleSubmit gate */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 grid gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
      >
        {/* Course Dropdown */}
        <div className="grid gap-1.5">
          <Label htmlFor="courseCode" className="text-foreground">Course</Label>
          <select
            id="courseCode"
            {...register("courseCode")}
            className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm text-foreground"
          >
            <option value="">Select a course...</option>
            {courses.data?.map((c) => (
              <option key={c.code} value={c.code}>{c.code}</option>
            ))}
          </select>
          {errors.courseCode && (
            <p className="text-sm text-red-600">{errors.courseCode.message}</p>
          )}
        </div>

        {/* Repository URL Input */}
        <div className="grid gap-1.5">
          <Label htmlFor="repoUrl" className="text-foreground">Repository URL</Label>
          <Input
            id="repoUrl"
            {...register("repoUrl")}
            aria-invalid={errors.repoUrl ? true : undefined}
            placeholder="https://github.com/you/your-repo"
          />
          {errors.repoUrl && (
            <p className="text-sm text-red-600">{errors.repoUrl.message}</p>
          )}
        </div>

        {/* Submit Button - Only disabled while saving, NOT on invalid */}
        <Button
          type="submit"
          disabled={addSubmission.isPending}
          className="justify-self-start"
        >
          {addSubmission.isPending ? "Saving..." : "Add submission"}
        </Button>
      </form>

      {/* Mutation Error */}
      {addSubmission.isError && (
        <p className="mb-4 text-sm text-red-700">{addSubmission.error.message}</p>
      )}

      {/* Submissions Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((s) => (
          <SubmissionBadge key={s.id} submission={s}>
            <p className="text-sm text-gray-500 dark:text-gray-400">Course: {s.courseCode}</p>
          </SubmissionBadge>
        ))}
      </div>
    </div>
  );
}

export default SubmissionsPage;