import { z } from "zod";

export const BookingSchema = z.object({
  catId: z.string({ message: "ID Kucing harus diisi" }),
  checkInDate: z.coerce.date({ message: "Tanggal penitipan harus diisi" }),
  checkOutDate: z.coerce.date({ message: "Tanggal pengambilan harus diisi" }),
  serviceType: z.enum(["BASIC", "PREMIUM", "DELUXE"], {
    message: "Tipe layanan tidak valid",
  }),
  additionalServices: z.enum(["GROOMING", "DELIVERY"], {
    message: "Layanan tambahan tidak valid",
  }),
  specialNote: z.string().max(500, "Catatan terlalu panjang").optional(),
});

export const checkInSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: "ID Booking tidak valid" }),
  }),
});

export const dailyUpdateSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: "ID Booking tidak valid" }),
  }),
  body: z.object({
    condition: z.string().min(1, "Kondisi harus diisi"),
    activity: z.string().min(1, "Aktivitas harus diisi"),
    note: z.string().optional(),
  }),
});

export const checkOutSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: "ID Booking tidak valid" }),
  }),
});

export type CreateBookingInput = z.infer<typeof BookingSchema>;
export type DailyUpdateInput = z.infer<typeof dailyUpdateSchema>;
export type CheckOutInput = z.infer<typeof checkOutSchema>;
export type BookingDTO = Pick<DailyUpdateInput, "body">;
