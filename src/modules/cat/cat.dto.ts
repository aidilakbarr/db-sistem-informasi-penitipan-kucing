import z from "zod";
import { catSchema } from "./cat.schema";

export type CatDTO = z.infer<typeof catSchema>;
