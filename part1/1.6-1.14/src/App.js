import Feedback from "./Components/Feedback/Feedback";
import Statistics from "./Components/Stats/Statistics";
import {useState} from "react";

function App() {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
  return (
    <div className="App">
      <Feedback setGood={setGood} setNeutral={setNeutral} setBad={setBad}/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  );
}

export default App;
