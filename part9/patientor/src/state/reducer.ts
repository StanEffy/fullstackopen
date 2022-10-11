import { State } from "./state";
import {Diagnosis, Entry, Patient} from "../types";
import {EntriesFormValues} from "../AddEntryForm/AddEntryForm";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
| {
  type: "SET_DIAGNOSES_LIST";
  payload: Diagnosis[];
}
| {
  type: "UPDATE_ENTRY_FOR_PATIENT";
  payload: { entry: Entry; id: string };
};

export const setPatientList = (patientListFromApi: Patient[]):Action => ({
  type: "SET_PATIENT_LIST",
  payload: patientListFromApi,
});

export const setDiagnoseList = (diagnoses: Diagnosis[]) => ({
  type: "SET_DIAGNOSES_LIST" as const,
  payload: diagnoses,
});

export const addPatient = (patient: Patient) => ({
  type: "ADD_PATIENT" as const,
  payload: patient,
});

export const updateEntryForPatient = (id: string, entry: EntriesFormValues) => ({
  type: "UPDATE_ENTRY_FOR_PATIENT" as const,
  payload: { id, entry },
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
              (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
              {}
          ),
          ...state.diagnoses,
        },
      };
    case "UPDATE_ENTRY_FOR_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            entries: [
              ...(state.patients[action.payload.id].entries || []),
              action.payload.entry,
            ],
          },
        },
      };
    default:
      return state;
  }
};
