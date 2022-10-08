import diagnosesData from "../data/diagnoses.json";
import {Diagnosis} from "../types/types";

const getEntries = ():Array<Diagnosis> => {
    return diagnosesData;
};

const addDiagnose = () => {
    return null;
};

export default {
    getEntries,
    addDiagnose
};
