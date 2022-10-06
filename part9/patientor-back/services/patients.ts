import patientsData from "../data/patients.json";
import { Patient} from "../types/types";

const getEntries = ():Array<Patient> => {
    return patientsData;
};

const addPatient = () => {
    return null;
};

export default {
    getEntries,
    addPatient
};
