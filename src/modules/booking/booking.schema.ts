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

export type CreateBookingInput = z.infer<typeof BookingSchema>;
