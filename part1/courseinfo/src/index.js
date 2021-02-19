import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => (
  <div id="header">
    <h1>{props.course.name}</h1>
  </div>
);

const Content = (props) => (
  <div id="content">
    <Part
      name={props.content.parts[0].name}
      numberOfExercises={props.content.parts[0].exercises}
    />
    <Part
      name={props.content.parts[1].name}
      numberOfExercises={props.content.parts[1].exercises}
    />
    <Part
      name={props.content.parts[2].name}
      numberOfExercises={props.content.parts[2].exercises}
    />
  </div>
);

const Part = (props) => (
  <p>
    {props.name} {props.numberOfExercises}
  </p>
);
const Total = (props) => {
  let totalExercises = 0;

  props.content.parts.forEach((part) => (totalExercises += part.exercises));

  return (
    <div id="total">
      <p>Number of Exercises {totalExercises}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
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
    ]
  };

  return (
    <div>
      <Header course={course} />
      <Content content={course} />
      <Total content={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
