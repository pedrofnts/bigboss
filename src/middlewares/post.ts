import { Request, Response, NextFunction } from "express";

export async function postMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const POST_TYPES = ["Esportes", "Entretenimento", "NULL"];

    const postIndex = POST_TYPES.indexOf(req.body.category);

    if (postIndex < 0) {
      throw "Error";
    }
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: "erro", message: "Type post not exist" });
  }
}
