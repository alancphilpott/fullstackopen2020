import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Header = ({ text }) => <h1 className={'header'}>{text}</h1>

const Button = ({ handler, text }) => <button onClick={handler}>{text}</button>

const Anecdote = ({ anecdote }) => <p className={'anecdote'}>"{anecdote}"</p>

const VoteCount = ({ points, selected }) => (
  <p className={'vote'}>Voted For : {points[selected]} Time(s)</p>
)

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(
    new Array(anecdotes.length + 1).join(0).split('').map(parseFloat)
  )

  const handleNext = () => {
    let newSelected

    do {
      newSelected = Math.floor(Math.random() * anecdotes.length)
    } while (newSelected === selected)

    setSelected(newSelected)
  }

  const handleVote = (selectedAnecdote) => {
    const newPoints = [...points]
    newPoints[selectedAnecdote] += 1

    setPoints(newPoints)
  }

  const getBestAnecdoteIndex = () => points.indexOf(Math.max(...points))

  return (
    <>
      <div className={'anecdotes'}>
        <Header text={'Anecdote of The Day'} />
        <Button handler={handleNext} text={'Next Anecdote'} />
        <Anecdote anecdote={anecdotes[selected]}></Anecdote>
        <VoteCount points={points} selected={selected} />
        <Button handler={() => handleVote(selected)} text={'Vote'} />
      </div>
      <div className={'showcase'}>
        <Header text={'Anecdote With Most Votes'} />
        <Anecdote anecdote={anecdotes[getBestAnecdoteIndex()]} />
        <VoteCount points={points} selected={getBestAnecdoteIndex()} />
      </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
