import React from 'react';
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Total from "./components/Total/Total";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
      <div>
        <Header name={courseName} />
          {courseParts.map(p => <Content key={p.name} name={p.name} count={p.exerciseCount} />)}
        <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
      </div>
  );
};

export default App;
