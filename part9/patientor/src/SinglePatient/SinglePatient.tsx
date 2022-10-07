import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {Patient} from "../types";
import GetGenderLabel from "./getGenderLabel";
import axios from "axios";
import {apiBaseUrl} from "../constants";

const SinglePatient = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);

    if(id === undefined) return null;

    React.useEffect(() => {
        void axios.get<void>(`${apiBaseUrl}/patients/${id}`);

        const fetchPatientList = async () => {
            try {
                const { data: patientFetched } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                console.log(patientFetched);
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
        </div>
    );
};

export default SinglePatient;
