import patientsData from "../data/patients.json";
import { Patient} from "../types/types";
import { v1 as uuid } from 'uuid';


const getEntries = ():Array<Patient> => {
    return patientsData;
};
const getEntriesWithoutSSN = ():Omit<Patient, "ssn">[] => {
    return patientsData.map(({id, occupation, dateOfBirth, gender, name}) => ({
        id, occupation, dateOfBirth, gender, name
    }));
};

const addPatient = (patient: Omit<Patient, "id"> ):Patient => {
    const newPatient:Patient = {...patient, id: uuid()};
    patientsData.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    addPatient,
    getEntriesWithoutSSN
};
