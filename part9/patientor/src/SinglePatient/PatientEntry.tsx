import React from "react";
import { DiagnoseState, Entry } from "../types";
import { HealthCheckEntryComponent } from "./HealthCheckEntry";
import { HospitalEntry } from "./HospitalEntry";
import { OccupationalHealthcareEntryComponent} from "./OccupationalHealthcare";

export const PatientEntry = ({
                                 entry,
                                 diagnoses,
                             }: {
    entry: Entry;
    diagnoses: DiagnoseState;
}) => {
    switch (entry.type) {
        case "HealthCheck": {
            return <HealthCheckEntryComponent entry={entry} />;
        }
        case "Hospital": {
            return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
        }
        case "OccupationalHealthcare": {
            return <OccupationalHealthcareEntryComponent entry={entry} diagnoses={diagnoses} />;
        }
        default:
            return null;
    }
};
