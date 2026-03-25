/*
  Warnings:

  - A unique constraint covering the columns `[cageId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CageStatus" AS ENUM ('AVAILABLE', 'OCCUPIED', 'MAINTENANCE');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "cageId" TEXT;

-- CreateTable
CREATE TABLE "Cage" (
    "id" TEXT NOT NULL,
    "cageNumber" TEXT NOT NULL,
    "type" "ServiceType" NOT NULL DEFAULT 'BASIC',
    "status" "CageStatus" NOT NULL DEFAULT 'AVAILABLE',
    "description" TEXT,
    "currentBookingId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cage_cageNumber_key" ON "Cage"("cageNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Cage_currentBookingId_key" ON "Cage"("currentBookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_cageId_key" ON "Booking"("cageId");

-- AddForeignKey
ALTER TABLE "Cage" ADD CONSTRAINT "Cage_currentBookingId_fkey" FOREIGN KEY ("currentBookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
