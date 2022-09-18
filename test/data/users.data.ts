import { mockPatient, mockPsychologist, mockUser } from "../helpers";

import { CreatePatientUserDto, CreatePsychologistUserDto } from "../../src/users/dto";

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
    mockUser({ taxId: createPsychologist.taxId, email: "test2.psychologist2@gmail.com", 
        password: createPsychologist.password, psychologist: { codopsi: "1231231" } as any
    }),
    mockUser({ email: createPsychologist.email, password: createPsychologist.password, 
        psychologist: { codopsi: "1231231" } as any
    }),
    mockUser({ email: "test2.psychologist2@gmail.com", password: createPsychologist.password, 
        psychologist: { codopsi: "1234567" } as any
    })
];

export const createPatient: CreatePatientUserDto = {
    patient: {},
    taxId: "12312312313",
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
    mockUser({ taxId: createPatient.taxId, email: "test2.patient2@gmail.com", 
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