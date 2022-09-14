import { mockPatient, mockPsychologist, mockUser } from "../helpers";

import { CreatePsychologistUserDto } from "../../src/users/dto";

export const usersArray = [
    mockUser({ _id: "1", taxId: "12392142932", isActive: true,
        psychologist: mockPsychologist({ _id: "1", codopsi: "1294321" }) as any }),
    mockUser({ _id: "2", taxId: "12392142933", isActive: false,
        psychologist: mockPsychologist({ _id: "2", codopsi: "1294322" }) as any }),
    mockUser({ _id: "3", taxId: "12392142934", isActive: true,
        patient: mockPatient({}) as any }),
];

export const createPsychologist: CreatePsychologistUserDto = {
    firstName: "test",
    lastName: "psychologist",
    email: "test.psychologist@gmail.com",
    password: "Test1239S",
    taxId: "12312312312",
    psychologist: {
        codopsi: "1234567"
    }
};

const expectedPsychologist = {
    user: {
      _id: expect.any(String),
      taxId: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
      isActive: true,
      psychologist: {
        codopsi: expect.any(String)
      }
    },
    token: expect.any(String)
  };