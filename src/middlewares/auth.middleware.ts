import { Request, Response, NextFunction } from 'express';
import { verify } from '../utils/token.util';
import { User } from '../models/user.model';

export const authenticate = async (req: any, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try{
    const payload: any = verify(token);
    const user = await User.findByPk(payload.id);
    if(!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  }catch(err){
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize = (roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if(!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if(!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
};
