// src/pages/BookingsPage.tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ApiBooking, ApiSession } from "../types/index";
import BookingCard from "../components/BookingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchBookings, fetchSessions, createBooking } from "../api/client";

// Schema for adding a booking
const bookingSchema = z.object({
  sessionId: z.string().min(1, "Please select a session"),
  tuteeId: z.string().min(1, "Please enter tutee ID"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

function BookingsPage() {
  const queryClient = useQueryClient();

  // Fetch bookings
  const { data, isPending, isError, error } = useQuery<ApiBooking[]>({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });

  // Fetch sessions for dropdown
  const { data: sessions } = useQuery<ApiSession[]>({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onBlur",
    defaultValues: { sessionId: "", tuteeId: "" },
  });

  // Mutation for adding a booking
  const addBooking = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      reset();
    },
  });

  const handleCancelBooking = (booking: ApiBooking) => {
    alert(`Booking #${booking.id} would be cancelled!`);
  };

  // ✅ FIX: convert sessionId and tuteeId to numbers
  const onSubmit = (values: BookingFormValues): void => {
    addBooking.mutate({
      sessionId: parseInt(values.sessionId),   // ✅ convert to number
      tuteeId: parseInt(values.tuteeId),       // ✅ convert to number
      status: "requested",
      bookedAt: new Date().toISOString(),
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-rose-50 p-6 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400">
        <p className="font-medium">{error.message}</p>
        <p className="mt-1 text-sm">Is json-server running on port 3001?</p>
      </div>
    );
  }

  const bookings = data ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Bookings
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {bookings.length} booking{bookings.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-blue-100 px-3.5 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          {bookings.length} total
        </span>
      </div>

      {/* Add Booking Section */}
      <div className="rounded-2xl border-2 border-gray-200/80 bg-white/90 p-6 shadow-lg dark:border-gray-600/80 dark:bg-gray-800/90">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Create New Booking
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="sessionId" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Session
            </Label>
            <select
              id="sessionId"
              {...register("sessionId")}
              className="w-full rounded-lg border-2 border-gray-200/80 bg-white/90 px-4 py-2.5 text-gray-900 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/20 dark:border-gray-600/80 dark:bg-gray-800/90 dark:text-white dark:focus:border-blue-500"
            >
              <option value="">Select a session...</option>
              {sessions?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.subject} (ID: {s.id})
                </option>
              ))}
            </select>
            {errors.sessionId && (
              <p className="text-sm text-rose-600 dark:text-rose-400">{errors.sessionId.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tuteeId" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tutee ID
            </Label>
            <Input
              id="tuteeId"
              {...register("tuteeId")}
              placeholder="Enter tutee ID"
              className="h-11 border-2 border-gray-200/80 bg-white/90 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 dark:border-gray-600/80 dark:bg-gray-800/90 dark:focus:border-blue-500"
            />
            {errors.tuteeId && (
              <p className="text-sm text-rose-600 dark:text-rose-400">{errors.tuteeId.message}</p>
            )}
          </div>

          <div className="flex items-end">
            <Button
              type="submit"
              disabled={addBooking.isPending}
              className="h-11 w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95 disabled:opacity-50 dark:from-blue-600 dark:to-indigo-600"
            >
              {addBooking.isPending ? "Creating..." : "Add Booking"}
            </Button>
          </div>
        </form>

        {addBooking.isError && (
          <p className="mt-3 text-sm text-rose-600 dark:text-rose-400">{addBooking.error.message}</p>
        )}
      </div>

      {/* Bookings Grid */}
      {bookings.length === 0 ? (
        <div className="rounded-xl bg-gray-50 p-8 text-center dark:bg-gray-800/50">
          <p className="text-gray-500 dark:text-gray-400">No bookings yet.</p>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
            Create your first booking above!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((b) => (
            <BookingCard key={b.id} booking={b} onCancel={handleCancelBooking}>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Booking #{b.id}
              </p>
            </BookingCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingsPage;        