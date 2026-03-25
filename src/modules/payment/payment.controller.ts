import { Request, Response } from "express";
import { adminVerifyPaymentSchema, userPaymentSchema } from "./payment.schema";
import * as paymentService from "./payment.service";
import { sendSuccess } from "src/utils/response";
import { HTTP_STATUS } from "src/utils/httpStatus";

export const verifyPayment = async (req: Request, res: Response) => {
  const { params, body } = adminVerifyPaymentSchema.parse({
    params: req.params,
    body: req.body,
  });

  const result = await paymentService.verifyAdminPayment(
    params.paymentId,
    body.status,
  );

  return sendSuccess(
    res,
    `Pembayaran berhasil diverifikasi sebagai ${body.status}`,
    result,
    HTTP_STATUS.OK,
  );
};

export const pay = async (req: Request, res: Response) => {
  const validatedData = userPaymentSchema.parse(req.body);
  if (validatedData.method === "COD") {
    validatedData.proofOfPayment = null;
  }

  const result = await paymentService.createUserPayment(validatedData);

  const message =
    req.body.method === "COD"
      ? "Metode COD dipilih, silakan bayar saat menitipkan kucing"
      : "Bukti transfer berhasil dikirim, mohon tunggu verifikasi admin";

  return sendSuccess(res, message, result, HTTP_STATUS.CREATED);
};
