import { Request, Response } from "express";
import * as cageService from "./cage.service";
import { sendSuccess } from "src/utils/response";
import { HTTP_STATUS } from "src/utils/httpStatus";
import { createCageSchema, updateCageSchema } from "./cage.schema";

export const getAll = async (req: Request, res: Response) => {
  const cages = await cageService.getCages();
  return sendSuccess(
    res,
    "Data kandang berhasil diambil",
    cages,
    HTTP_STATUS.OK,
  );
};

export const create = async (req: Request, res: Response) => {
  const validatedData = createCageSchema.parse(req.body);
  const cage = await cageService.addCage(validatedData);
  return sendSuccess(
    res,
    "Kandang berhasil ditambahkan",
    cage,
    HTTP_STATUS.CREATED,
  );
};

export const update = async (req: Request, res: Response) => {
  const { params, body } = updateCageSchema.parse({
    params: req.params,
    body: req.body,
  });

  const updated = await cageService.changeCage(params.cageId, body);
  return sendSuccess(
    res,
    "Kandang berhasil diperbarui",
    updated,
    HTTP_STATUS.OK,
  );
};
