import express from 'express';
import patientsService from "../services/patients";
import {Patient} from "../types/types";

interface TypedRequestBody<T> extends Express.Request {
    body: T
}

const router = express.Router();

router.get('/', (_req, res) => {
    const value = patientsService.getEntriesWithoutSSN();
    res.send(value);
});

router.post('/', (req:TypedRequestBody<Omit<Patient, "id">>, res) => {
    const addPatient = patientsService.addPatient(req.body);
    res.send(addPatient);
});

export default router;
