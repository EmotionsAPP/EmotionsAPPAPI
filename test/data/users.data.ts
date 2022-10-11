import { mockPatient, mockPsychologist, mockUser } from "../helpers";

import { CreatePatientUserDto, CreatePsychologistUserDto } from "../../src/users/dto";

export const usersArray = [
    mockUser({ _id: "1", isActive: true,
        psychologist: mockPsychologist({ _id: "1", idCardNo: "12392142932" }) as any }),
    mockUser({ _id: "2", isActive: false,
        psychologist: mockPsychologist({ _id: "2", idCardNo: "12392142933" }) as any }),
    mockUser({ _id: "3", isActive: true,
        patient: mockPatient({}) as any }),
];

export const createPsychologist: CreatePsychologistUserDto = {
    firstName: "test",
    lastName: "psychologist",
    email: "test.psychologist@gmail.com",
    password: "Test1239S",
    psychologist: {
        idCardNo: "12312312312"
    }
};

export const expectedPsychologist = {
    user: {
        _id: expect.any(String),
        isActive: true,
        ...createPsychologist,
        password: expect.any(String)
    }, 
    token: expect.any(String)
};

export const duplicatedPsychologists = [
    mockUser({ email: "test2.psychologist2@gmail.com", password: createPsychologist.password, 
        psychologist: { idCardNo: createPsychologist.psychologist.idCardNo } as any
    }),
    mockUser({ email: createPsychologist.email, password: createPsychologist.password, 
        psychologist: { idCardNo: "12345678901" } as any
    }),
];

export const createPatient: CreatePatientUserDto = {
    patient: {},
    firstName: "test",
    lastName: "patient",
    email: "test.patient@gmail.com",
    password: "Test1239S"
};

export const expectedPatient = {
    user: {
        _id: expect.any(String),
        isActive: true,
        ...createPatient,
        password: expect.any(String)
    },
    token: expect.any(String)
}

export const duplicatedPatient = [
    mockUser({ email: "test2.patient2@gmail.com", 
        password: createPatient.password, patient: {} as any
    }),
    mockUser({ email: createPatient.email, password: createPatient.password, 
        patient: {} as any
    }),
    mockUser({ email: "test2.patient2@gmail.com", password: createPatient.password, 
        patient: {} as any
    })
];

// const expectedPsychologist = {
//     user: {
//       _id: expect.any(String),
//       taxId: expect.any(String),
//       firstName: expect.any(String),
//       lastName: expect.any(String),
//       email: expect.any(String),
//       password: expect.any(String),
//       isActive: true,
//       psychologist: {
//         codopsi: expect.any(String)
//       }
//     },
//     token: expect.any(String)
//   };