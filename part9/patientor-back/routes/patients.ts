import express from 'express';
import patientsService from "../services/patients";
import {Entry, Patient} from "../types/types";
import {isString} from "../utils/utils";

interface TypedRequestBody<T> extends Express.Request {
    body: T,
    params:{
        id: string
    }
}

const router = express.Router();

router.get('/', (_req, res) => {
    const value = patientsService.getEntriesWithoutSSN();
    res.send(value);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const value = patientsService.getOnePatient(id);
    res.send(value);
});

router.post('/', (req:TypedRequestBody<Omit<Patient, "id">>, res) => {
    const {body} = req;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.keys(body).map(k => isString(body[k]));
    const addPatient = patientsService.addPatient(req.body);
    res.send(addPatient);
});

router.post(':id/entries', (req:TypedRequestBody<Entry>, res) => {
    const id = req.params.id;
    const entry = req.body;
    const addToPatient = patientsService.addEntryToPatient(id, entry);
    res.send(addToPatient);
});

export default router;
