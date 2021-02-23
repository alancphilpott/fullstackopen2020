import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import Header from './components/Header'
import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)

  const handleNeutral = () => setNeutral(neutral + 1)

  const handleBad = () => setBad(bad + 1)

  const resetScore = () => {
    setGood(0)
    setNeutral(0)
    setBad(0)
  }

  return (
    <>
      <Header text={'⬇️ Give Feedback ⬇️'} />
      <div className={'feedbackButtons'}>
        <Button handleClick={handleGood} text={'Good ✔️'} />
        <Button handleClick={handleNeutral} text={'Neutral 😐'} />
        <Button handleClick={handleBad} text={'Bad ❌'} />
        <Button handleClick={resetScore} text={'Reset 🚫'} />
      </div>
      <Header text={'🖊️ Statistics 📓'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
