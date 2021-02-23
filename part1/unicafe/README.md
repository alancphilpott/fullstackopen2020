# fullstackopen2020 unicafe

This project is part of the [fullstackopen](https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#exercises-1-6-1-14) course.

This is a SPA built to collect feedback through button clicks and display statistics of feedback - utilizing the React fundamentals of component state, event handlers, passing props/event handlers to child components.

There are 3 simple state variables within the root App component, each corresponding to a feedback choice:

- good
- neutral
- bad

The state is updated when the user clicks a button. Once some feedback is give, a Statistics component renders Stat components to the screen displaying the result. There is also a Table component displaying feedback results.

On page load, conditional rendering is used for the Statistics component:

![No Feedback Given](https://i.imgur.com/vGLzynX.png)

Once the state of any variable is updated, the Statistics component is shown on re-render:

![Feedback Given](https://i.imgur.com/pUImM7G.png)

Here is the component tree displaying using react-developer-tools:

![Component Tree](https://i.imgur.com/3lhDu8W.png)

# Other Info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
