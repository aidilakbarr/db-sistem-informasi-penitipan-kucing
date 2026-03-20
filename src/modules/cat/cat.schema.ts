import { z } from "zod";

const CAT_LIST = [
  "persia",
  "siamase",
  "scottish fold",
  "maine coon",
  "anggora",
  "bengal",
  "siberian",
  "sphynx",
  "russian blue",
  "british shorthair",
] as const;

export const catSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    ras: z.enum(CAT_LIST, {
      message: "Invalid ras. Must be one of: " + CAT_LIST.join(", "),
    }),
    age: z
      .number()
      .min(0, "Age must be a positive number")
      .max(20, "Age must be a number between 0 and 20"),
    weight: z.number().min(0, "Weight must be a positive number"),
    medicalHistory: z
      .string()
      .min(5, "Medical history must be at least 5 characters long")
      .max(200, "Medical history must be at most 200 characters long"),
    vaccinationStatus: z.enum(["vaccinated", "not vaccinated"], {
      message:
        "Invalid vaccination status. Must be either 'vaccinated' or 'not vaccinated'",
    }),
    vaccineExpirationDate: z.coerce.date().optional(),
    specialNote: z
      .string()
      .max(200, "Special note must be at most 200 characters long"),
  })
  .refine(
    (data) => {
      if (data.vaccinationStatus === "vaccinated") {
        return data.vaccineExpirationDate !== undefined;
      }
      return true;
    },
    {
      message:
        "Vaccine expiration date is required when vaccination status is 'vaccinated'",
      path: ["vaccineExpirationDate"],
    },
  );

export const updateCatSchema = z.object({
  params: z.object({
    catId: z.string().min(1, "ID tidak boleh kosong"),
  }),
  body: catSchema,
});

export const deleteCatSchema = z.object({
  params: z.object({
    catId: z.string().min(1, "ID tidak boleh kosong"),
  }),
});
