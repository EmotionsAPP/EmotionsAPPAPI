import { User } from "../../src/users/entities";

export const mockUser = (
    user: Partial<User>
): Partial<User> => ({
    _id: user?._id,
    taxId: user?.taxId,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    password: user?.password,
    profileImage: user?.profileImage,
    gender: user?.gender,
    birthDate: user?.birthDate,
    isActive: user?.isActive,
    psychologist: user?.psychologist,
    patient: user?.patient,
    updateOne: jest.fn()
});
