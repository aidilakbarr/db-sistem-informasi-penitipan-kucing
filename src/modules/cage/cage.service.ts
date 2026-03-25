import { AppError } from "src/middlewares/error.middleware";
import * as cageRepository from "./cage.repository";
import { CageDTO, CageStatus, UpdateCageDTO } from "./cage.schema";
import { HTTP_STATUS } from "src/utils/httpStatus";

export const getCages = async () => {
  return await cageRepository.getAllCages();
};

export const addCage = async (data: CageDTO) => {
  return await cageRepository.createCage(data);
};

export const changeCage = async (id: string, data: UpdateCageDTO) => {
  const cage = await cageRepository.findById(id);
  if (!cage)
    throw new AppError("Kandang tidak ditemukan", HTTP_STATUS.NOT_FOUND);

  return await cageRepository.updateCage(id, data);
};
