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

    if (!(await verifyPassword( password, admin.password ))) return null;

    await adminModel.updateOne({ _id: admin._id }, { lastLogin: new Date() });

    return admin;
  }

  return login;
}
