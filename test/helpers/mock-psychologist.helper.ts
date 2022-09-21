import { Psychologist } from "../../src/users/entities";

export const mockPsychologist = (
    psy: Partial<Psychologist>
): Partial<Psychologist> => ({
    cedula: psy?.cedula,
    title: psy?.title,
    firstWorkDate: psy?.firstWorkDate,
    about: psy?.about,
    goals: psy?.goals,
    workPlaces: psy?.workPlaces,
});