import express from 'express';
import patientsService from "../services/patients";

const router = express.Router();

router.get('/', (_req, res) => {
    const value = patientsService.getEntriesWithoutSSN();
    res.send(value);
});

router.post('/', (_req, res) => {
    res.send('Saving a diary!');
});

export default router;
