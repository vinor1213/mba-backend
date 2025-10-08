import { Request, Response, NextFunction } from 'express';
import { verify } from '../utils/token.util';
import { unauthorized } from '../utils/response.util';

export function jwtMiddleware(req: any, res: Response, next: NextFunction){
  const auth = req.headers.authorization;
  if(!auth) return unauthorized(res, 'No token provided');
  const parts = auth.split(' ');
  if(parts.length !== 2) return unauthorized(res, 'Invalid token format');
  const token = parts[1];
  const decoded = verify(token);
  if(!decoded) return unauthorized(res, 'Invalid token');
  req.user = decoded;
  next();
}
