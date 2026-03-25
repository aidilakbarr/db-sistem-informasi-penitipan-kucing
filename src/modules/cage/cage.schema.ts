import { Schema, z } from "zod";

export const CageType = ["BASIC", "PREMIUM", "DELUXE"] as const;
export const CageStatus = ["AVAILABLE", "OCCUPIED", "MAINTENANCE"] as const;

export const createCageSchema = z.object({
  cageNumber: z.string().min(1, "Nomor kandang wajib diisi"),
  type: z.enum(CageType, {
    message:
      "Tipe kandang tidak valid. Harus salah satu dari: BASIC, PREMIUM, DELUXE",
  }),
  status: z.enum(CageStatus).optional(),
  description: z.string().optional(),
  currentBookingId: z.string().optional(),
});

export const updateCageBodySchema = createCageSchema.partial();

export const updateCageSchema = z.object({
  params: z.object({
    cageId: z.string().min(1, "ID kandang tidak boleh kosong"),
  }),
  body: updateCageBodySchema,
});

export type CageDTO = z.infer<typeof createCageSchema>;
export type UpdateCageDTO = z.infer<typeof updateCageBodySchema>;
