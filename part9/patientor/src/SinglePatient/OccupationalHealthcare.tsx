import React from "react";
import { Diagnosis, DiagnoseState, OccupationalHealthcareEntry } from "../types";
import {Card} from "@material-ui/core";
import VerifiedIcon from '@mui/icons-material/Verified';

export const OccupationalHealthcareEntryComponent = ({
                                    entry,
                                    diagnoses,
                                }: {
    entry: OccupationalHealthcareEntry;
    diagnoses: DiagnoseState;
}) => (
    <Card style={{ width: "50rem", padding: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
            <h4>{entry.date}</h4> <VerifiedIcon/>
        </div>
        <p>{entry.description}</p>
        <p>Employer: {entry.employerName}</p>
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
