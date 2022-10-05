const express = require('express');
const app = express();
const calcBmi = require("./bmiCalculator")
interface TypedRequestBody<T> extends Express.Request {
    query: T
}
interface TypedResponseCalculator<T> extends Express.Response{
    obj: T
}

app.get('/hello', (_req:any, res:any) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req: TypedRequestBody<{height:string, weight:string}>, res: any) =>{
    const { height, weight } = req.query;
    const str = calcBmi(height, weight)
    if(!parseInt(height) || !parseInt(weight)){
        res.json(JSON.stringify({ error: "malformatted parameters"}))
    }
    res.json(JSON.stringify({height, weight, bmi: str}))
})
const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
