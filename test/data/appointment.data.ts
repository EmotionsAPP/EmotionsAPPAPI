import { AppointmentStatus } from "../../src/appointments/interfaces";

export const createAppointment = {
    description: 'A description',
    start: new Date('2022-09-16T20:00:00.000Z'),
    end: new Date('2022-09-16T21:00:00.000Z'),
    psychologist: '1',
    patient: '2'
};

export const createdAppointment = {
    ...createAppointment,
    _id: '1',
    status: AppointmentStatus.Scheduled,
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    populate: jest.fn(),
    updateOne: jest.fn()
};

export const updateAppointment = {
    started: new Date("2022-09-16T20:00:00.000Z"),
    status: AppointmentStatus.Started
};

export const updatedAppointment = {
    ...createdAppointment,
    started: new Date("2022-09-16T20:00:00.000Z"),
    status: AppointmentStatus.Started
};
