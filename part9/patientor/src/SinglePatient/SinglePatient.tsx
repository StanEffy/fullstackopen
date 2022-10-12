import React, {useState} from 'react';
import { useParams} from "react-router-dom";
import {Entry, EntryType, Gender, Patient} from "../types";
import GetGenderLabel from "./getGenderLabel";
import axios from "axios";
import {apiBaseUrl} from "../constants";
import {PatientEntry} from "./PatientEntry";
import {updateEntryForPatient, useStateValue} from "../state";
import {Box, Button} from "@material-ui/core";
import AddEntryModal from "../AddEntryForm";
import {EntriesFormValues} from "../AddEntryForm/AddEntryForm";
import {
    parseHealthCheckEntry,
    parseOccupationalHealthcareEntry,
    parseValidEntry,
    parseValidHospitalEntry
} from "../utils/utils";

const SinglePatient = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [{ diagnoses }, dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };


    if(id === undefined) return null;

    const submitNewEntry = async (values: EntriesFormValues) => {
        console.log(values);
        try {
            const parsedValues = parseValidEntry(values);
            let entryRes;
            let obj;
            switch (values.entryType) {
                case EntryType.Hospital:
                    obj = {
                        entry: parsedValues,
                        dischargeDate: values.dischargeDate,
                        dischargeCriteria: values.dischargeCriteria
                    };
                    entryRes = parseValidHospitalEntry(obj);
                    break;
                case EntryType.HealthCheck:
                    obj = {
                        entry: parsedValues,
                       ...values
                    };
                    entryRes = parseHealthCheckEntry(obj);
                    break;
                case EntryType.OccupationalHealthcare:
                    obj = {
                        entry: parsedValues,
                        ...values
                    };
                    entryRes = parseOccupationalHealthcareEntry(obj);
                    break;
            }
            console.log(entryRes);
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                entryRes
            );

            dispatch(updateEntryForPatient(id, newEntry));
            closeModal();
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error(e?.response?.data || "Unrecognized axios error");
                setError(String(e?.response?.data?.error) || "Unrecognized axios error");
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };
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
            <h2>{patient.name} <GetGenderLabel gender={patient.gender as Gender}/></h2>
            <p>SSN: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <h2>Entries:</h2>

            {patient?.entries?.map((entry) => (
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                <PatientEntry key={entry.id} entry={entry} diagnoses={diagnoses} />
            ))}
            <Box marginBottom={4}/>
            <AddEntryModal modalOpen={modalOpen}
                           onSubmit={submitNewEntry}
                           error={error}
                           patientName={patient.name}
                           onClose={closeModal}/>
            <Button variant="contained" color="primary" onClick={() => openModal()}>
                ADD NEW ENTRY
            </Button>
        </div>
    );
};

export default SinglePatient;
