import { useState } from "react";
import BookingCard from "../components/BookingCard";
import { allBookings } from "../data/mockData";
import type { Booking } from "../types/index";

function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(allBookings);

  const handleCancelBooking = (booking: Booking) => {
    const updatedBookings = bookings.map((b) =>
      b.id === booking.id ? { ...b, status: "cancelled" as const } : b
    );
    setBookings(updatedBookings);
    alert(`Booking #${booking.id} cancelled!`);
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        📝 My Bookings ({bookings.length})
      </h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          You have no bookings yet.
        </p>
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