import { Request, Response } from "express";
import * as catService from "./cat.service";
import { sendSuccess } from "../../utils/response";
import { HTTP_STATUS } from "../../utils/httpStatus";
import { catSchema, updateCatSchema, deleteCatSchema } from "./cat.schema";

export const create = async (req: Request, res: Response) => {
  const validatedData = catSchema.parse(req.body);

  const cat = await catService.createCat(validatedData, req.user!.id);

  return sendSuccess(res, "Cat created successfully", cat, HTTP_STATUS.CREATED);
};

export const getAll = async (req: Request, res: Response) => {
  const cats = await catService.getCat(req.user!.id);
  return sendSuccess(res, "Cats retrieved successfully", cats);
};

export const update = async (req: Request, res: Response) => {
  const { params, body } = updateCatSchema.parse({
    params: req.params,
    body: req.body,
  });

  const updatedCat = await catService.putCat(params.catId, body, req.user!.id);
  return sendSuccess(res, "Cat updated successfully", updatedCat);
};

export const remove = async (req: Request, res: Response) => {
  const { params } = deleteCatSchema.parse({ params: req.params });

  await catService.deleteCat(params.catId, req.user!.id);
  return sendSuccess(res, "Cat deleted successfully", null);
};
