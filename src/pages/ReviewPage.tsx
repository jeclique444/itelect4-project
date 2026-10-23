import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AiReview } from "../types/index";
import { askAi } from "../api/client";
import { reviewFormSchema } from "../schemas/reviewSchema";
import type { ReviewFormValues } from "../schemas/reviewSchema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const READINESS_STYLE: Record<AiReview["readiness"], { bg: string; text: string }> = {
  ready: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-800 dark:text-green-300" },
  almost: { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-800 dark:text-yellow-300" },
  "not-yet": { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-800 dark:text-red-300" },
};

function ReviewPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { prompt: "" },
  });

  const promptValue = watch("prompt") || "";

  const review = useMutation({
    mutationFn: askAi,
  });

  const onSubmit = (values: ReviewFormValues): void => {
    review.mutate(values.prompt);
  };

  return (
    <div className="animate-fade-in mx-auto max-w-4xl">
      {/* Header - Same style as Dashboard */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-400 to-indigo-400 p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-64 w-64 -translate-y-12 translate-x-12 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-12 translate-y-12 rounded-full bg-white/5 blur-2xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold [text-shadow:_0_2px_8px_rgba(0,0,0,0.2)]">
            AI Review
          </h2>
          <p className="mt-1 text-blue-50 [text-shadow:_0_1px_4px_rgba(0,0,0,0.15)]">
            Describe a study session you plan to run and get feedback before you do it.
          </p>
        </div>
      </div>

      {/* Form Card - Glassmorphism */}
      <div className="animate-slide-up rounded-2xl border-2 border-gray-200/80 bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:border-gray-600/80 dark:bg-gray-800/90 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="prompt" className="text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Session plan
              </Label>
              <span className={`text-xs font-medium ${promptValue.length > 1900 ? 'text-red-500' : 'text-gray-400'}`}>
                {promptValue.length} / 2000
              </span>
            </div>
            
            <textarea
              id="prompt"
              rows={6}
              {...register("prompt")}
              aria-invalid={errors.prompt ? true : undefined}
              placeholder="What you will study, for how long, what you will build, and how you will check it..."
              className="resize-none rounded-xl border-2 border-gray-200 bg-gray-50/50 p-4 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-400/20 dark:border-gray-700 dark:bg-gray-900/50 dark:text-white dark:focus:border-blue-500 dark:focus:bg-gray-900"
            />
            {errors.prompt && (
              <p className="text-sm font-medium text-red-600 dark:text-red-400">
                {errors.prompt.message}
              </p>
            )}
          </div>

          {/* Submit Button - Same glowing effect as Dashboard, no emoji */}
          <Button
            type="submit"
            disabled={review.isPending}
            className="group relative flex w-full sm:w-auto sm:justify-self-end items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-indigo-400 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-300/40 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 dark:from-blue-600 dark:to-indigo-600 [text-shadow:_0_1px_4px_rgba(0,0,0,0.15)]"
          >
            <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-40 dark:from-blue-600 dark:to-indigo-600"></span>
            {review.isPending ? "Reviewing..." : "Review my session"}
          </Button>
        </form>

        {/* Error Message */}
        {review.isError && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <p className="text-sm font-medium text-red-800 dark:text-red-300">
              {review.error.message}
            </p>
          </div>
        )}
      </div>

      {/* Result Card - Matches Dashboard's Details Panel */}
      {review.data && (
        <div className="mt-6 animate-slide-up rounded-2xl border-2 border-gray-200/80 bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:border-gray-600/80 dark:bg-gray-800/90">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI Feedback</h3>
            </div>
            
            {/* Readiness Badge (Dashboard Pill Style) */}
            <span className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold capitalize ${READINESS_STYLE[review.data.readiness].bg} ${READINESS_STYLE[review.data.readiness].text}`}>
              {review.data.readiness}
            </span>
          </div>

          <div className="mt-6 grid gap-6">
            {/* Summary Box */}
            <div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Summary
              </h4>
              <p className="rounded-xl bg-blue-50/70 p-4 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200 leading-relaxed border border-blue-100 dark:border-gray-700">
                {review.data.summary}
              </p>
            </div>

            {/* Two Columns for Strengths and Improvements */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-green-50/50 p-4 border border-green-100 dark:border-green-900/30 dark:bg-green-900/10">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-green-700 dark:text-green-400">
                  Strengths
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {review.data.strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-amber-50/50 p-4 border border-amber-100 dark:border-amber-900/30 dark:bg-amber-900/10">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Before you run it
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {review.data.improvements.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewPage;