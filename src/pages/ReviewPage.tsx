import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AiReview } from "../types/index";
import { askAi } from "../api/client";
import { reviewFormSchema } from "../schemas/reviewSchema";
import type { ReviewFormValues } from "../schemas/reviewSchema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const READINESS_STYLE: Record<AiReview["readiness"], string> = {
  ready: "bg-green-100 text-green-800",
  almost: "bg-yellow-100 text-yellow-800",
  "not-yet": "bg-red-100 text-red-800",
};

function ReviewPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { prompt: "" },
  });

  // useMutation runs ONLY when the user clicks the button, unlike useQuery
  // which runs on page load. A review request costs quota, so it shouldn't
  // happen automatically.
  const review = useMutation({
    mutationFn: askAi,
  });

  const onSubmit = (values: ReviewFormValues): void => {
    review.mutate(values.prompt);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
        AI Review
      </h2>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Describe a study session you plan to run and get feedback before you do it.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="prompt" className="text-foreground">
            Session plan
          </Label>
          <textarea
            id="prompt"
            rows={6}
            {...register("prompt")}
            aria-invalid={errors.prompt ? true : undefined}
            placeholder="What you will study, for how long, what you will build, and how you will check it..."
            className="rounded-lg border border-input bg-background p-2.5 text-sm text-foreground"
          />
          {errors.prompt && (
            <p className="text-sm text-red-600">{errors.prompt.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={review.isPending}
          className="justify-self-start"
        >
          {review.isPending ? "Reviewing..." : "Review my session"}
        </Button>
      </form>

      {/* Shows the API's error sentence (like 429 rate limit) */}
      {review.isError && (
        <p className="mt-4 text-sm text-red-700">{review.error.message}</p>
      )}

      {/* Shows the AI result when it succeeds */}
      {review.data && (
        <div className="mt-6 grid gap-4 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
          <span
            className={`justify-self-start rounded px-2 py-0.5 text-sm font-semibold ${
              READINESS_STYLE[review.data.readiness]
            }`}
          >
            {review.data.readiness}
          </span>
          <p className="text-gray-900 dark:text-white">{review.data.summary}</p>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Strengths
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
              {review.data.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Before you run it
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
              {review.data.improvements.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewPage;