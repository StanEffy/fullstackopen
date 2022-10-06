import diagnosesData from "../data/diagnoses.json";
import {Diagnose} from "../types/types";

const getEntries = ():Array<Diagnose> => {
    return diagnosesData;
};

const addDiagnose = () => {
    return null;
};

export default {
    getEntries,
    addDiagnose
};
