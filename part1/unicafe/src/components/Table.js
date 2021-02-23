import React from 'react'

const Table = ({ good, bad, neutral, getTotalScore, getAvgScore, getPositiveFeedback }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Feedback</th>
            <th>Value</th>
          </tr>
          <tr className={'good'}>
            <td>Good</td>
            <td>{good}</td>
          </tr>
          <tr className={'neutral'}>
            <td>Neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr className={'bad'}>
            <td>Bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>All</td>
            <td>{getTotalScore()}</td>
          </tr>
          <tr>
            <td>Average</td>
            <td>{getAvgScore()}</td>
          </tr>
          <tr>
            <td>Positive</td>
            <td>{getPositiveFeedback().concat('%')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table
