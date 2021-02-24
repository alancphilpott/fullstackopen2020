import React from 'react'

const Total = ({ parts }) => {
  const total = parts.reduce((total, p) => (total += p.exercises), 0)

  return (
    <p>
      <strong>Total of {total} Exercises</strong>
    </p>
  )
}

export default Total
