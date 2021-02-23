# fullstackopen2020 anecdotes

This project is part of the [fullstackopen](https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#exercises-1-6-1-14) course.

This is a SPA in which users vote for their favorite Anecdote. The highest voted Anecdote is always displayed along with its number of votes. The rendered Anecdote which users vote on is based on RNG - though it will never be the same Anecdote twice.

![Application Screenshot](https://i.imgur.com/4TKG7Vf.png)

## Implementation

The Anecdotes are defined using an Array and passed as props to the _App_ component.

There are two managed states within the App component:

- selected
- points

The _selected_ state variable determines which Anecdote from the array of Anecdotes gets rendered. As mentioned - this is based on RNG. There is logic to ensure the random number does not match the current state value of _selected_.

The _points_ state variable is a dynamically initialized array with length based on the number of Anecdotes. When a user votes for an Anecdote, the aforementioned _selected_ variable determines which index to update. E.G. _selected_ = 0 will refernece the first Anecdote and if voted for will update the 0th index of the _points_ array.

    selected = 0
    Text: anecdotes[0] => Votes: points[0]

    selected = 1
    Text: anecdotes[1] => Votes: points[1]

Finally, the Anecdote with the most votes is determined by a function call which returns the index of the Anecdote most voted for.

## Component Tree

![Screenshot of Component Tree](https://i.imgur.com/qdsjESQ.png)

# Other Info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
