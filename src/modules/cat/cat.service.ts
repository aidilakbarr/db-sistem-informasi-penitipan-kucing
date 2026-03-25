import { AppError } from "src/middlewares/error.middleware";
import { CatDTO } from "./cat.dto";
import * as catRepository from "./cat.repository";
import { HTTP_STATUS } from "src/utils/httpStatus";

export const createCat = async (data: CatDTO, ownerId: string) => {
  const isCatExist = await catRepository.findCatByNameAndOwnerId(
    data.name,
    ownerId,
  );
  if (isCatExist) {
    throw new AppError(
      "Cat with the same name already exists for this owner",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  const cat = await catRepository.createCat({ ...data }, ownerId);
  return {
    id: cat.id,
    name: cat.name,
    breed: cat.ras,
  };
};

export const getCat = async (ownerId: string) => {
  const cat = await catRepository.findAllCatsByOwnerId(ownerId);
  return cat;
};

export const putCat = async (id: string, data: CatDTO, ownerId: string) => {
  const isCatExist = await catRepository.findCatByIdAndOwnerId(id, ownerId);

  if (!isCatExist) {
    throw new AppError("Cat not found", HTTP_STATUS.NOT_FOUND);
  }

  const updatedCat = await catRepository.updateCat(id, data);
  return {
    id: updatedCat.id,
    name: updatedCat.name,
    breed: updatedCat.ras,
  };
};

export const deleteCat = async (id: string, ownerId: string) => {
  const isCatExist = await catRepository.findCatByIdAndOwnerId(id, ownerId);

  if (!isCatExist) {
    throw new AppError("Cat not found", HTTP_STATUS.NOT_FOUND);
  }

  const deletedCat = await catRepository.deleteCat(id, ownerId);
  return deletedCat;
};
