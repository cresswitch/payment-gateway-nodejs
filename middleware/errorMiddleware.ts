import { logger } from "../utils/logger";
import { Request, Response } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: Function) {
  logger.error(err.stack);

  if(err.name == "ValidationError"){
    const errors = Object.values(err.errors).map(error => error.message);
  }
}