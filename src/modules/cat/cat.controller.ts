import { Request, Response } from "express";
import * as catService from "./cat.service";
import { sendSuccess } from "../../utils/response";
import { HTTP_STATUS } from "../../utils/httpStatus";
import { catSchema } from "./cat.schema";
import { AppError } from "src/middlewares/error.middleware";
import z from "zod";

export const create = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
  }

  const validatedData = catSchema.parse(req.body);

  const cat = await catService.createCat(validatedData, req.user.id);

  return sendSuccess(res, "Cat created successfully", cat, HTTP_STATUS.CREATED);
};

export const get = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
  }

  const cat = await catService.getCat(req.user.id);

  return sendSuccess(res, "Cat retrieved successfully", cat);
};

export const put = async (req: Request, res: Response) => {
  const updateCatSchema = z.object({
    params: z.object({
      catId: z.string().min(1, "ID tidak boleh kosong"),
    }),
    body: catSchema,
  });

  if (!req.user) {
    throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
  }

  const { params, body } = updateCatSchema.parse({
    params: req.params,
    body: req.body,
  });

  const updatedCat = await catService.putCat(params.catId, body, req.user.id);
  return sendSuccess(res, "Cat updated successfully", updatedCat);
};

export const deleteCat = async (req: Request, res: Response) => {
  const deleteCatSchema = z.object({
    params: z.object({
      catId: z.string().min(1, "ID tidak boleh kosong"),
    }),
  });

  if (!req.user) {
    throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
  }

  const { params } = deleteCatSchema.parse({
    params: req.params,
  });

  await catService.deleteCat(params.catId, req.user.id);
  return sendSuccess(res, "Cat deleted successfully", null);
};
