import React from "react";
import { DiagnoseState, Diagnosis, Entry} from "../types";
import {Card} from "@material-ui/core";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
export const HospitalEntry = ({
                                  entry,
                                  diagnoses,
                              }: {
    entry: Entry;
    diagnoses: DiagnoseState;
}) => (
    <Card style={{ width: "50rem", padding: "1rem", marginBottom: 2 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
            <h4>{entry.date}</h4><LocalHospitalIcon />
        </div>
        <p>{entry.description}</p>
        <ul>
            {entry?.diagnosisCodes?.map((diagnosisCode) => (
                <li key={diagnosisCode}>
                    {diagnoses[diagnosisCode as keyof Diagnosis]?.code}:{" "}
                    {diagnoses[diagnosisCode as keyof Diagnosis]?.name}
                </li>
            ))}
        </ul>
    </Card>
);
