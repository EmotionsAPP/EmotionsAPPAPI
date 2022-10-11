import { Psychologist } from "../../src/users/entities";

export const mockPsychologist = (
    psy: Partial<Psychologist>
): Partial<Psychologist> => ({
    idCardNo: psy?.idCardNo,
    title: psy?.title,
    firstWorkDate: psy?.firstWorkDate,
    about: psy?.about,
    goals: psy?.goals,
    workPlaces: psy?.workPlaces,
});