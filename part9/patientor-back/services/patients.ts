import patientsData from "../data/patients.json";
import { Patient} from "../types/types";

const getEntries = ():Array<Patient> => {
    return patientsData;
};
const getEntriesWithoutSSN = ():Omit<Patient, "ssn">[] => {
    return patientsData.map(({id, occupation, dateOfBirth, gender, name}) => ({
        id, occupation, dateOfBirth, gender, name
    }));
};

const addPatient = () => {
    return null;
};

export default {
    getEntries,
    addPatient,
    getEntriesWithoutSSN
};
