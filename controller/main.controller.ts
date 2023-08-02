import { Request, Response } from "express";

export const initiliazeServer = (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "hello word" });
  } catch (err) {
    res.status(500).send({ success: false, err });
  }
};
