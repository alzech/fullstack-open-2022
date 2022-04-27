import { useState } from 'react'

const Button = ({clickHandler, label}) => {
  return (
    <>
      <button onClick={clickHandler}> {label} </button>
    </>
  )
}

const StatRow = ({stat, label, suffix}) => {
  return (
    <>
      <tr>
        <td>{label}</td>
        <td>{stat}{suffix}</td>
      </tr>
    </>
  )
}

const Stats = ( {good, neutral, bad}) => {
  let sum = good + neutral + bad
  let avg = 0
  if (sum !== 0 )  {
    avg = (good-bad) / sum
  }
  let pos = 0
  if (good !== 0) pos = good / sum

  if (sum === 0) {
    return (
      <p>No feedback given</p>
    )
  } else {
    return (
      <>
        <h1> statistics </h1>
        <table>
          <tbody>
            <StatRow stat={good} label="good" suffix=""/>
            <StatRow stat={neutral} label="neutral" suffix=""/>
            <StatRow stat={bad} label="bad" suffix=""/>
            <StatRow stat={sum} label="all" suffix=""/>
            <StatRow stat={avg} label="average" suffix=""/>
            <StatRow stat={pos} label="positive" suffix="%"/>
          </tbody>
        </table>

      </>
    )
  }
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setClickHandler = (setter, state) => {
    const handler = () => {
      setter(state+1)
    }
    return handler;
  }

  return (
    <div>
      <h1> give feedback </h1>
      <Button clickHandler={setClickHandler(setGood, good)} label="good"/>
      <Button clickHandler={setClickHandler(setNeutral, neutral)} label="neutral"/>
      <Button clickHandler={setClickHandler(setBad, bad)} label="bad"/>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
