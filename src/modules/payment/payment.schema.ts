import { z } from "zod";

export const StatusPayment = ["SUCCESS", "FAILED"] as const;
export const MethodPayment = ["COD", "TRANSFER"] as const;

export const adminVerifyPaymentSchema = z.object({
  params: z.object({
    paymentId: z.string({ message: "ID Pembayaran tidak valid" }),
  }),
  body: z.object({
    status: z.enum(StatusPayment, {
      message: "Status harus SUCCESS atau FAILED",
    }),
    adminNote: z.string().max(200, "Catatan maksimal 200 karakter").optional(),
  }),
});

export const userPaymentSchema = z
  .object({
    bookingId: z.string({ message: "ID Booking tidak valid" }),
    method: z.enum(MethodPayment, {
      message: "Metode harus COD atau TRANSFER",
    }),
    amount: z.number().positive({ message: "Jumlah harus lebih besar dari 0" }),
    proofOfPayment: z.string().optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.method === "TRANSFER" && !data.proofOfPayment) {
        return false;
      }
      return true;
    },
    {
      message: "Bukti transfer wajib diunggah untuk metode TRANSFER",
      path: ["proofOfPayment"],
    },
  );

export type AdminVerifyPaymentDTO = z.infer<typeof adminVerifyPaymentSchema>;
export type UserPaymentDTO = z.infer<typeof userPaymentSchema>;
