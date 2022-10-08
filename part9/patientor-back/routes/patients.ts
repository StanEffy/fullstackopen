import express from 'express';
import patientsService from "../services/patients";
import {Patient} from "../types/types";
import {isString} from "../utils/utils";

interface TypedRequestBody<T> extends Express.Request {
    body: T
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

export default router;
