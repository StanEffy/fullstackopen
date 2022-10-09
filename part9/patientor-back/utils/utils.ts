import {Discharge, Entry, EntryType, Gender, HealthCheckRating, NewEntry, Patient, SickLeave} from "../types/types";
import {v1 as uuid} from 'uuid';

export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name ${name}`);
    }
    return name;
};

const createId = ():string => {
    return uuid();
};
const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Missing or wrong occupation ${occupation}`);
    }
    return occupation;
};
const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error(`Missing or wrong occupation ${specialist}`);
    }
    return specialist;
};
const parseCriteria = (criteria: unknown): string => {
    if (!criteria || !isString(criteria)) {
        throw new Error(`Missing or wrong criteria ${criteria}`);
    }
    return criteria;
};
const parseDescription = (description: unknown):string => {
    if (!description || !isString(description)) {
        throw new Error(`Missing or wrong description ${description}`);
    }
    return description;
};
const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Missing or wrong ssn ${ssn}`);
    }
    return ssn;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Missing or wrong date: ${date}`);
    }
    return date;
};

const isEntryType = (type: any):type is EntryType => {
    return Object.values(EntryType).includes(type);
};

const parseEntryType = (type: unknown):EntryType =>{
    if(!type || !isEntryType(type)){
        throw new Error(`Missing or wrong entry type ${type}`);
    }
    return type;
};
const parseDiagnosisCodes = (codes: unknown): string[] => {
    if (codes === undefined) return [] as string[];
    if (Array.isArray(codes) === false) {
        throw new Error("Diagnosis codes should be either undefined or an array");
    }
    if (!(codes as string[]).every((code) => isString(code))) {
        throw new Error("All codes must be strings");
    }
    return codes as string[];
};
const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};

const parseEmployerName = (name: unknown) => {
    if(!name || !isString(name)){
        throw new Error(`Something is wrong with employer name: ${name}`);
    }
    return name;
};

const parseHealthcheckRating = (rating: unknown): HealthCheckRating => {
    if(rating === 0) return HealthCheckRating.Healthy;
    if(rating === 1) return HealthCheckRating.LowRisk;
    if(rating === 2) return HealthCheckRating.HighRisk;
    if(rating === 3) return HealthCheckRating.CriticalRisk;

    throw new Error("Something is wrong with health check rating");

};
const parseEntries = (entries: any): Entry[] => {
    if (!entries) {
        throw new Error(`Incorrect or missing entries: ${entries}`);
    }
    return entries;
};
// const isDischarge = ({date, criteria}: {date: unknown, criteria: unknown}) =>{
//     if(!date && !criteria || !parseDate(date) && !isString(criteria)){
//         throw new Error(`something is wrong with date ${date} or criteria: ${criteria}`);
//     }
//     return true;
// };

// const parseDischarge = (discharge:{date: string, criteria: string}):Discharge => {
//     if(!discharge || !isDischarge(discharge)){
//         throw new Error(`Incorrect or missing discharge: ${discharge}`);
//     }
//     return discharge;
// };
const parseDischarge = (discharge: unknown): Discharge => {
    if (!(typeof discharge === "object" && discharge !== null)) {
        throw new Error("Value of discharge is missing or invalid");
    }

    if (!("date" in discharge && "criteria" in discharge)) {
        throw new Error("Object discharge does not include all of the required fields");
    }

    const obj = discharge as { date: unknown; criteria: unknown };

    return {
        criteria: parseCriteria(obj.criteria),
        date: parseDate(obj.date),
    };
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {

    if (!(typeof sickLeave === "object" && sickLeave !== null)) {
        throw new Error("Value of sickLeave is missing or invalid");
    }

    if (!("startDate" in sickLeave && "endDate" in sickLeave)) {
        throw new Error("Object sickLeave does not include all of the required fields");
    }

    const obj = sickLeave as { startDate: unknown; endDate: unknown };

    return {
        startDate: parseDate(obj.startDate),
        endDate: parseDate(obj.endDate),
    };
};
export const makeNewPatientEntry = (object: any): Omit<Patient, "id"> => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries),
    };
};

export const parseValidEntry = ({
    type,
    description,
    id,
    date,
    specialist,
    sickLeave,
    diagnosisCodes,
    discharge,
    employerName,
    healthCheckRating}: {
    type: unknown;
    description: unknown;
    id?: string;
    date: unknown;
    specialist: unknown;
    diagnosisCodes: unknown;
    discharge?: unknown;
    employerName?: unknown;
    sickLeave?: unknown;
    healthCheckRating?: unknown}): Entry =>{

    const baseEntry = {
        id: id ? id : createId(),
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        type: parseEntryType(type),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
    };

    switch (baseEntry.type) {
        case EntryType.Hospital:
            return {
                ...baseEntry,
                type: EntryType.Hospital,
                discharge: parseDischarge(discharge)
            };
        case  EntryType.HealthCheck:
            return {
                ...baseEntry,
                type: EntryType.HealthCheck,
                healthCheckRating: parseHealthcheckRating(healthCheckRating)
            };
        case EntryType.OccupationalHealthcare:
            return {
                ...baseEntry,
                type: EntryType.OccupationalHealthcare,
                employerName: parseEmployerName(employerName),
                sickLeave: parseSickLeave(sickLeave)
            };
    }

};
