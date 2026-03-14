'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateBookingStatus, updatePaymentStatus } from '@/app/actions/bookings';
import { CalendarCheck, Building, Link2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Booking {
  id: string;
  booking_ref: string;
  tour_id: string;
  tour_title: string;
  tour_price: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  country: string | null;
  travelers: number;
  travel_date: string | null;
  special_requests: string | null;
  payment_method: string;
  payment_status: string;
  booking_status: string;
  created_at: string;
  updated_at: string;
}

interface BookingsClientProps {
  bookings: Booking[];
}

const bookingStatusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-violet-100 text-violet-800',
};

const paymentStatusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-slate-100 text-slate-800',
};

export default function BookingsClient({ bookings }: BookingsClientProps) {
  const [search, setSearch] = useState('');

  const filteredBookings = bookings.filter((b) => {
    const q = search.toLowerCase();
    return (
      b.booking_ref.toLowerCase().includes(q) ||
      b.tour_title.toLowerCase().includes(q) ||
      b.first_name.toLowerCase().includes(q) ||
      b.last_name.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q)
    );
  });

  const handleBookingStatusChange = async (id: string, status: string) => {
    try {
      await updateBookingStatus(id, status);
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  const handlePaymentStatusChange = async (id: string, status: string) => {
    try {
      await updatePaymentStatus(id, status);
    } catch (error) {
      console.error('Failed to update payment status:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search bookings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="font-semibold">Ref</TableHead>
              <TableHead className="font-semibold">Tour</TableHead>
              <TableHead className="font-semibold">Customer</TableHead>
              <TableHead className="font-semibold">Travel Date</TableHead>
              <TableHead className="font-semibold text-center">Travelers</TableHead>
              <TableHead className="font-semibold">Payment</TableHead>
              <TableHead className="font-semibold">Payment Status</TableHead>
              <TableHead className="font-semibold">Booking Status</TableHead>
              <TableHead className="font-semibold">Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-2">
                    <CalendarCheck className="w-8 h-8 text-slate-300" />
                    <span>{search ? 'No bookings match your search.' : 'No bookings yet.'}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-slate-50/50">
                  {/* Ref */}
                  <TableCell className="font-mono text-xs font-medium text-slate-700">
                    {booking.booking_ref}
                  </TableCell>

                  {/* Tour */}
                  <TableCell>
                    <div className="max-w-[200px]">
                      <p className="text-sm font-medium text-slate-900 truncate">{booking.tour_title}</p>
                      {booking.tour_price && (
                        <p className="text-xs text-slate-500">{booking.tour_price}</p>
                      )}
                    </div>
                  </TableCell>

                  {/* Customer */}
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {booking.first_name} {booking.last_name}
                      </p>
                      <p className="text-xs text-slate-500">{booking.email}</p>
                      {booking.phone && <p className="text-xs text-slate-400">{booking.phone}</p>}
                    </div>
                  </TableCell>

                  {/* Travel Date */}
                  <TableCell className="text-sm text-slate-700 whitespace-nowrap">
                    {booking.travel_date
                      ? new Date(booking.travel_date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—'}
                  </TableCell>

                  {/* Travelers */}
                  <TableCell className="text-center text-sm font-medium text-slate-700">
                    {booking.travelers}
                  </TableCell>

                  {/* Payment Method */}
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
                      {booking.payment_method === 'bank_transfer' ? (
                        <>
                          <Building className="w-3.5 h-3.5" />
                          Bank Transfer
                        </>
                      ) : (
                        <>
                          <Link2 className="w-3.5 h-3.5" />
                          Pay by Link
                        </>
                      )}
                    </span>
                  </TableCell>

                  {/* Payment Status */}
                  <TableCell>
                    <Select
                      defaultValue={booking.payment_status}
                      onValueChange={(val) => handlePaymentStatusChange(booking.id, val)}
                    >
                      <SelectTrigger className="h-7 w-[110px] text-xs border-0 shadow-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {['pending', 'paid', 'failed', 'refunded'].map((s) => (
                          <SelectItem key={s} value={s}>
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${paymentStatusColors[s]}`}
                            >
                              {s}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* Booking Status */}
                  <TableCell>
                    <Select
                      defaultValue={booking.booking_status}
                      onValueChange={(val) => handleBookingStatusChange(booking.id, val)}
                    >
                      <SelectTrigger className="h-7 w-[120px] text-xs border-0 shadow-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {['new', 'confirmed', 'cancelled', 'completed'].map((s) => (
                          <SelectItem key={s} value={s}>
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${bookingStatusColors[s]}`}
                            >
                              {s}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* Submitted */}
                  <TableCell className="text-xs text-slate-500 whitespace-nowrap">
                    {new Date(booking.created_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                    <br />
                    {new Date(booking.created_at).toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary */}
      {filteredBookings.length > 0 && (
        <p className="text-xs text-slate-400 text-right">
          Showing {filteredBookings.length} of {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
