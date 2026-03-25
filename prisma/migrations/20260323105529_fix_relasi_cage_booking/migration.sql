-- DropForeignKey
ALTER TABLE "Cage" DROP CONSTRAINT "Cage_currentBookingId_fkey";

-- DropIndex
DROP INDEX "Booking_cageId_key";

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "Cage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
