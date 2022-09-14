import { Patient } from "../../src/users/entities";

export const mockPatient = (
    patient: Partial<Patient>
): Partial<Patient> => ({
    information: patient?.information,
    diagnostic: patient?.diagnostic
});