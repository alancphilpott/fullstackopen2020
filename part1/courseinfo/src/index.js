import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => (
  <div id="header">
    <h1>{props.course}</h1>
  </div>
);

const Content = (props) => (
  <div id="content">
    <Part
      name={props.content[0].name}
      numberOfExercises={props.content[0].exercises}
    />
    <Part
      name={props.content[1].name}
      numberOfExercises={props.content[1].exercises}
    />
    <Part
      name={props.content[2].name}
      numberOfExercises={props.content[2].exercises}
    />
  </div>
);

const Part = (props) => (
  <p>
    {props.name} {props.numberOfExercises}
  </p>
);

const Total = (props) => {
  let total =
    props.content[0].exercises +
    props.content[1].exercises +
    props.content[2].exercises;

  return (
    <div id="total">
      <p>Number of Exercises {total}</p>
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";

  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10
    },
    {
      name: "Using props to pass data",
      exercises: 7
    },
    {
      name: "State of a component",
      exercises: 14
    }
  ];

  return (
    <div>
      <Header course={course} />
      <Content content={parts} />
      <Total content={parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
