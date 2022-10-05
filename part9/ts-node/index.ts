import express from 'express';
const app = express();
import {calcBMI}  from "./bmiCalculator";
interface TypedRequestBody<T> extends Express.Request {
    query: T
}


app.get('/hello', (_req:never, res:express.Response) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req: TypedRequestBody<{height:string, weight:string}>, res:express.Response) =>{
    const { height, weight } = req.query;
    const str = calcBMI(Number(height), Number(weight));
    if(!parseInt(height) || !parseInt(weight)){
        res.json(JSON.stringify({ error: "malformatted parameters"}));
    }
    res.json(JSON.stringify({height, weight, bmi: str}));
});
const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
