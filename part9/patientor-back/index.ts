import express from 'express';
import cors = require("cors") ;
import DiagnosesRoutes from "./routes/diagnose";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use("/api/diagnoses", DiagnosesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
