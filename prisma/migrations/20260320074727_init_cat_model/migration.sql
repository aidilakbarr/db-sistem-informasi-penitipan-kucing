-- CreateEnum
CREATE TYPE "CatRas" AS ENUM ('persia', 'siamase', 'scottish fold', 'maine coon', 'anggora', 'bengal', 'siberian', 'sphynx', 'russian blue', 'british shorthair');

-- CreateEnum
CREATE TYPE "VaccinationStatus" AS ENUM ('vaccinated', 'not vaccinated');

-- CreateTable
CREATE TABLE "Cat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ras" "CatRas" NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "medicalHistory" TEXT NOT NULL,
    "vaccinationStatus" "VaccinationStatus" NOT NULL,
    "vaccineExpirationDate" TIMESTAMP(3),
    "specialNote" VARCHAR(200),
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cat" ADD CONSTRAINT "Cat_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
