import React, {useState} from 'react';
import { useParams} from "react-router-dom";
import {Patient} from "../types";
import GetGenderLabel from "./getGenderLabel";
import axios from "axios";
import {apiBaseUrl} from "../constants";
import {PatientEntry} from "./PatientEntry";
import {useStateValue} from "../state";
import {Box, Button} from "@material-ui/core";

const SinglePatient = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [{ diagnoses }] = useStateValue();
    console.log(diagnoses);

    if(id === undefined) return null;

    React.useEffect(() => {
        void axios.get<void>(`${apiBaseUrl}/patients/${id}`);

        const fetchPatientList = async () => {
            try {
                const { data: patientFetched } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );

                setPatient(patientFetched);
            } catch (e) {
                console.error(e);
            }
        };
        void fetchPatientList();
    }, []);

    if(patient === null) return null;

    return (
        <div>
            <h2>{patient.name} <GetGenderLabel gender={patient.gender}/></h2>
            <p>SSN: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <h2>Entries:</h2>

            {patient?.entries?.map((entry) => (
                <PatientEntry key={entry.id} entry={entry} diagnoses={diagnoses} />
            ))}
            <Box marginBottom={4}/>
            <Button variant="contained" color="primary">
                ADD NEW ENTRY
            </Button>
        </div>
    );
};

export default SinglePatient;
