import { Model } from "mongoose";
import { verifyPassword } from "../../auth/security";
import { Admin } from '../entities';

export const authenticateWrapper = (adminModel: Model<Admin>) => {

  const login = async (email: string, password: string) => {
    const admin = await adminModel.findOne({
      email,
      isActive: { $eq: true }
    });

    if (!admin) return null;

    if (!verifyPassword( password, admin.password )) return null;

    return admin;
  }

  const authenticate = async (email: string, password: string) => {
    const USER = {
      _id: "Master Administrator",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    }
  
    if (email === USER.email && password === USER.password) 
      return Promise.resolve(USER);

    return await login( email, password );
  }

  return authenticate;
}
