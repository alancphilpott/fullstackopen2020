import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => (
  <div id="header">
    <h1>{props.course}</h1>
  </div>
);

const Content = (props) => (
  <div id="content">
    <Part name={props.p1.name} numberOfExercises={props.p1.exercises} />
    <Part name={props.p2.name} numberOfExercises={props.p2.exercises} />
    <Part name={props.p3.name} numberOfExercises={props.p3.exercises} />
  </div>
);

const Total = (props) => (
  <div id="total">
    <p>Number of Exercises {props.ex1 + props.ex2 + props.ex3}</p>
  </div>
);

const Part = (props) => (
  <p>
    {props.name} {props.numberOfExercises}
  </p>
);

const App = () => {
  const course = "Half Stack application development";

  const part1 = {
    name: "Fundamentals of React",
    exercises: 10
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7
  };
  const part3 = {
    name: "State of a component",
    exercises: 14
  };

  return (
    <div>
      <Header course={course} />
      <Content p1={part1} p2={part2} p3={part3} />
      <Total
        ex1={part1.exercises}
        ex2={part2.exercises}
        ex3={part3.exercises}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
