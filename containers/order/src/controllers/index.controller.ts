import { Request, Response } from "express";
import { Order } from "../models/order";

export const indexOrderController = async (req: Request, res: Response) => {
    const orders = await Order.find({ userUuid: req.user!.uuid });

    res.send(orders);
};