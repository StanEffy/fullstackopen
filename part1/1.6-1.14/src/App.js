import Feedback from "./Components/Feedback/Feedback";
import Statistics from "./Components/Stats/Statistics";
import {useState} from "react";
import Total from "./Components/Total/Total";

function App() {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const countAll = () => good + neutral + bad
    const countAverage = () => (good - bad)  / countAll()
    const countPositive = () => good / countAll()
  return (
    <div className="App">
      <Feedback setGood={setGood} setNeutral={setNeutral} setBad={setBad}/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
      <Total all={countAll()} average={countAverage()} positive={countPositive()}/>
    </div>
  );
}

export default App;
