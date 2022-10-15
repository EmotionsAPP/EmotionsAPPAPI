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

export const appointmentsHistory = [
    {
        "_id": "634a1767b5b46061920b283e",
        "description": "An encounter",
        "start": "2020-11-17T06:00:00.000Z",
        "end": "2020-11-17T10:00:00.000Z",
        "status": "Completed",
        "isActive": true,
        "psychologist": "6344d0d7e75e136a54b497a3",
        "patient": "63462a9487115297c41077a3",
        "createdAt": "2022-10-15T02:13:59.229Z",
        "updatedAt": "2022-10-15T02:13:59.229Z",
        "__v": 0
    },
    {
        "_id": "634a13dc23fff643b4332966",
        "description": "An encounter",
        "start": "2020-11-16T20:00:00.000Z",
        "end": "2020-11-16T21:00:00.000Z",
        "status": "Completed",
        "isActive": true,
        "psychologist": "6344d0d7e75e136a54b497a3",
        "patient": "63462a9487115297c41077a3",
        "createdAt": "2022-10-15T01:58:52.662Z",
        "updatedAt": "2022-10-15T01:58:52.662Z",
        "__v": 0
    },
    {
        "_id": "634a13e523fff643b4332969",
        "description": "An encounter",
        "start": "2020-11-15T20:00:00.000Z",
        "end": "2020-11-15T21:00:00.000Z",
        "status": "Completed",
        "isActive": true,
        "psychologist": "6344d0d7e75e136a54b497a3",
        "patient": "63462a9487115297c41077a3",
        "createdAt": "2022-10-15T01:59:01.028Z",
        "updatedAt": "2022-10-15T01:59:01.028Z",
        "__v": 0
    },
    {
        "_id": "634a13f523fff643b433296c",
        "description": "An encounter",
        "start": "2020-11-15T06:00:00.000Z",
        "end": "2020-11-15T10:00:00.000Z",
        "status": "Completed",
        "isActive": true,
        "psychologist": "6344d0d7e75e136a54b497a3",
        "patient": "63462a9487115297c41077a3",
        "createdAt": "2022-10-15T01:59:17.161Z",
        "updatedAt": "2022-10-15T01:59:17.161Z",
        "__v": 0
    }
]

export const expectedAppointmentsHistory = [
    {
        "date": "2020-11-17",
        "appointments": [
            {
                "_id": "634a1767b5b46061920b283e",
                "description": "An encounter",
                "start": "2020-11-17T06:00:00.000Z",
                "end": "2020-11-17T10:00:00.000Z",
                "status": "Completed",
                "isActive": true,
                "psychologist": "6344d0d7e75e136a54b497a3",
                "patient": "63462a9487115297c41077a3",
                "createdAt": "2022-10-15T02:13:59.229Z",
                "updatedAt": "2022-10-15T02:13:59.229Z",
                "__v": 0
            }
        ]
    },
    {
        "date": "2020-11-16",
        "appointments": [
            {
                "_id": "634a13dc23fff643b4332966",
                "description": "An encounter",
                "start": "2020-11-16T20:00:00.000Z",
                "end": "2020-11-16T21:00:00.000Z",
                "status": "Completed",
                "isActive": true,
                "psychologist": "6344d0d7e75e136a54b497a3",
                "patient": "63462a9487115297c41077a3",
                "createdAt": "2022-10-15T01:58:52.662Z",
                "updatedAt": "2022-10-15T01:58:52.662Z",
                "__v": 0
            }
        ]
    },
    {
        "date": "2020-11-15",
        "appointments": [
            {
                "_id": "634a13e523fff643b4332969",
                "description": "An encounter",
                "start": "2020-11-15T20:00:00.000Z",
                "end": "2020-11-15T21:00:00.000Z",
                "status": "Completed",
                "isActive": true,
                "psychologist": "6344d0d7e75e136a54b497a3",
                "patient": "63462a9487115297c41077a3",
                "createdAt": "2022-10-15T01:59:01.028Z",
                "updatedAt": "2022-10-15T01:59:01.028Z",
                "__v": 0
            },
            {
                "_id": "634a13f523fff643b433296c",
                "description": "An encounter",
                "start": "2020-11-15T06:00:00.000Z",
                "end": "2020-11-15T10:00:00.000Z",
                "status": "Completed",
                "isActive": true,
                "psychologist": "6344d0d7e75e136a54b497a3",
                "patient": "63462a9487115297c41077a3",
                "createdAt": "2022-10-15T01:59:17.161Z",
                "updatedAt": "2022-10-15T01:59:17.161Z",
                "__v": 0
            }
        ]
    }
]
