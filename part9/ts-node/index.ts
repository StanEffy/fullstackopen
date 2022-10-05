import express from 'express';
const app = express();
import {calcBMI}  from "./bmiCalculator";
import {calculateExercises} from "./exerciseCalculator";
// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment
const { question } = require("readline-sync") ;
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
interface TypedRequestBodyExercises<T> extends Express.Request {
    body: T
}
app.post("/exercises", (_req:TypedRequestBodyExercises<{ daily_exercise: number[], target: number }>, res:express.Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
   const target = question("What is your target?");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
   const daily_exercise:string = question("Type days of exercises splitted by comma with no space");
    if(!daily_exercise || !target){
        res.json(JSON.stringify({ error: "malformatted parameters"}));
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call
    res.json(calculateExercises(daily_exercise.split(",").map(el => parseInt(el)), target));
});


const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
