import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import { signToken } from '../utils/token.util';
import { success, error } from '../utils/response.util';

export const register = async (req: Request, res: Response) => {
  try{
    const { name, email, password ,role} = req.body;

  
    const exists = await User.findOne({ where: { email }});
    if(exists) return error(res, 'User exists', 400);
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role});
    const token:any = signToken({ id: user.id, role: user.role });
    return success(res, { user, token }, 'Registered', 201);
  }catch(err){
    console.error(err);
    return error(res, 'Registration failed');
  }
};

export const login = async (req: Request, res: Response) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }});
    if(!user) return error(res, 'Invalid credentials', 401);
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return error(res, 'Invalid credentials', 401);
    const token = signToken({ id: user.id, role: user.role });
    return success(res, { user, token }, 'Logged in');
  }catch(err){
    console.error(err);
    return error(res, 'Login failed');
  }
};
