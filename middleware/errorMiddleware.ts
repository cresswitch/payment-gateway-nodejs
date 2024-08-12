import { logger } from "../utils/logger";
import { Request, Response } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: Function) {
  logger.error(err.stack);

  /*if(err.name == "ValidationError"){
    const errors = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({ error: errors });
  }*/

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ error: `${field} already exists.` });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  res.status(500).json({ error: 'Internal Server Error' });
}