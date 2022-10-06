import express from 'express';
import diagnosesService from "../services/diagnoses";

const router = express.Router();

router.get('/', (_req, res) => {
    const value = diagnosesService.getEntries();
    res.send(value);
});

router.post('/', (_req, res) => {
    res.send('Saving a diary!');
});

export default router;
