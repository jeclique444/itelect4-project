import { z } from "zod";

export const submissionSchema = z.object({
  courseCode: z.string().min(1, "Choose a course."),
  repoUrl: z
    .url("That is not a valid URL -- include https://")
    .refine((url) => url.includes("github.com"), {
      message: "It has to be a GitHub URL.",
    }),
});

export type SubmissionFormValues = z.infer<typeof submissionSchema>;