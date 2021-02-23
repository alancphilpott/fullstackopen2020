import React from 'react'
import Stat from './Stat'
import Table from './Table'

const Statistics = ({ good, neutral, bad }) => {
  const getTotalScore = () => good + neutral + bad
  const getAvgScore = () => ((good - bad) / getTotalScore()).toFixed(2)
  const getPositiveFeedback = () =>
    getTotalScore() === 0 ? 0 : ((good / getTotalScore()) * 100).toFixed(2)

  return getTotalScore() === 0 ? (
    <div className={'stats'}>No Feedback Given</div>
  ) : (
    <div className={'stats'}>
      <Stat text={'✔️ Good'} value={good} />
      <Stat text={'😐 Neutral'} value={neutral} />
      <Stat text={'❌ Bad'} value={bad} />
      <Stat text={'All'} value={getTotalScore()} />
      <Stat text={'Average'} value={getAvgScore()} />
      <Stat text={'Positive'} value={getPositiveFeedback().concat('%')} />
      <hr />
      <Table
        good={good}
        neutral={neutral}
        bad={bad}
        getTotalScore={getTotalScore}
        getAvgScore={getAvgScore}
        getPositiveFeedback={getPositiveFeedback}
      />{' '}
    </div>
  )
}

export default Statistics
