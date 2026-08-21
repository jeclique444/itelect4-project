import { useQuery } from "@tanstack/react-query";
import type { ApiBooking } from "../types/index";
import BookingCard from "../components/BookingCard";
import { fetchBookings } from "../api/client";

function BookingsPage() {
  const { data, isPending, isError, error } = useQuery<ApiBooking[]>({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });

  const handleCancelBooking = (booking: ApiBooking) => {
    alert(`Booking #${booking.id} would be cancelled!`);
  };

  if (isPending) {
    return (
      <div className="animate-pulse p-6 text-gray-500 dark:text-gray-400">
        Loading bookings...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
        {error.message} — is json-server running?
      </div>
    );
  }

  const bookings = data ?? [];

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        📝 My Bookings ({bookings.length})
      </h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((b) => (
            <BookingCard key={b.id} booking={b} onCancel={handleCancelBooking}>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                🆔 Booking #{b.id}
              </p>
            </BookingCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingsPage;