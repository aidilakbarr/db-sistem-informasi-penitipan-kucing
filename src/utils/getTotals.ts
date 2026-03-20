import { CreateBookingInput } from "src/modules/booking/booking.schema";

export const getTotals = (data: CreateBookingInput) => {
  const checkIn = new Date(data.checkInDate);
  const checkOut = new Date(data.checkOutDate);
  const timeDiff = checkOut.getTime() - checkIn.getTime();
  const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const duration = days > 0 ? days : 1; // Minimal 1 hari

  const basicServiceCost = 20000;
  const premiumServiceCost = 35000;
  const deluxeServiceCost = 50000;
  const groomingCost = 75000;
  const deliveryCost = 100000;

  const basePrice =
    duration *
    (data.serviceType === "BASIC"
      ? basicServiceCost
      : data.serviceType === "PREMIUM"
        ? premiumServiceCost
        : deluxeServiceCost);
  const additionalCost =
    (data.additionalServices === "GROOMING" ? groomingCost : 0) +
    (data.additionalServices === "DELIVERY" ? deliveryCost : 0);

  const totalPrice: number = basePrice + additionalCost;

  return totalPrice;
};
