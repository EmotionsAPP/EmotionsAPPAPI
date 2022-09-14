import { Psychologist } from "../../src/users/entities";

export const mockPsychologist = (
    psy: Partial<Psychologist>
): Partial<Psychologist> => ({
    codopsi: psy?.codopsi,
    title: psy?.title,
    firstWorkDate: psy?.firstWorkDate,
    about: psy?.about,
    goals: psy?.goals,
    workPlaces: psy?.workPlaces,
});