import patientsData from "../data/patients.json";
import {Entry, NewPatient, Patient, PublicPatient} from "../types/types";
import { v1 as uuid } from 'uuid';
import {makeNewPatientEntry} from "../utils/utils";

const patientEntries: Patient[] = patientsData.map(p => {
    const patient = makeNewPatientEntry(p) as Patient;
    patient.id = p.id;
    return patient;
});

const getEntries = ():Array<PublicPatient> => {
    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const getEntriesWithoutSSN = ():PublicPatient[] => {
    return patientsData.map(({id, occupation, dateOfBirth, gender, name}) => ({
        id, occupation, dateOfBirth, gender, name
    }));
};

const addPatient = (patient: NewPatient):PublicPatient => {
    const newPatient = {...patient, id: uuid()};
    patientEntries.push(newPatient);
    return newPatient;
};
const getOnePatient = (id:string):Patient | "Patient with such id does not exist" => {
    return patientEntries.find(p => p.id === id) || "Patient with such id does not exist";
};

const addEntryToPatient = (id:string, entry: Entry):Patient | "Patient with such id does not exist" => {
    const patient = patientEntries.find(p => p.id === id);
    patient ? patient.entries?.push(entry) : null;
    return  patient || "Patient with such id does not exist";
};

export default {
    getEntries,
    addPatient,
    getOnePatient,
    getEntriesWithoutSSN,
    addEntryToPatient
};
