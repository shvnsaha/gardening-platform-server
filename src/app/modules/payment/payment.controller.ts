import { Request, Response } from "express";
import { paymentServices } from "./payment.service";



const confirmationController = async (req: Request, res: Response) => {
    const { tranId } = req.query;
    const result = await paymentServices.confirmationService(tranId as string);
    res.send(result)
};

export const paymentControler = {
    confirmationController
}