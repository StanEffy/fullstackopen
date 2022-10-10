
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
export interface SickLeave {
  startDate: string;
  endDate: string;
}
export interface Discharge {
  date: string;
  criteria: string;
}
export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  sickLeave: SickLeave;
  employerName: string;
}
export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
}
export enum EntryType {
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
  HealthCheck = 'HealthCheck'
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
  ssn?: string,
  gender: Gender,
  occupation: string,
  entries?: Entry[],
};

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, "id">;
export type DiagnoseState = { [code: string]: Diagnosis };
