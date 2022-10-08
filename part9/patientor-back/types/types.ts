// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
}
export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
interface SickLeave {
    startDate: string;
    endDate: string;
}
interface Discharge {
    date: string;
    criteria: string;
}
interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}
interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: SickLeave;
}
interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: Discharge;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export type Diagnosis = {
    code: string,
    name: string,
    latin?: string,
};
export type Patient = {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
    entries?: Entry[],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export enum Gender {
    male = "male",
    female = "female",
    other = "other"
}
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, "id">;
