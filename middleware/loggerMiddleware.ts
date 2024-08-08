import { logger } from "../utils/logger";
import express, {Request, Response} from 'express';

export const requestLogger = (req: Request, res: Response, next: Function) => {
    logger.info(`${req.method} ${req.url}`, {
      body: req.body,
      params: req.params,
      query: req.query,
      ip: req.ip
    });
    next();
  };