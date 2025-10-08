import { Request, Response, NextFunction } from 'express';
export default function loggerMiddleware(req: Request, res: Response, next: NextFunction){
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
}
