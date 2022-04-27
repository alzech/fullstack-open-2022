import { useState } from 'react'
import parse from 'html-react-parser'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [indexHistory, setHistory] = useState([0, 0, 0, 0, 0, 0, 0])

  const getRandomIndex = () => Math.floor(Math.random() * 7)
  const updateIndexHistory = () => {
    let indexes = indexHistory.concat()
    indexes[selected] += 1
    return indexes;
  }
  const maxVotes = Math.max(...indexHistory)
  const maxIndexes = indexHistory.map((item, index) => item === maxVotes ? index : -1).filter(item => item !== -1)
  const maxAnecdotes = maxIndexes.map(item => anecdotes[item])
  const htmlString = maxAnecdotes.join(' <br> ')
  return (
    <div>
      <h1> Anecdote of the day </h1>
      <p> {anecdotes[selected]} </p>
      <p> has {indexHistory[selected]} votes </p>
      <div>
        <button onClick={() => setSelected(getRandomIndex())}>next anecdote</button>
        <button onClick={() => setHistory(updateIndexHistory())}>vote</button>
      </div>
      <h1>Anecdote(s) with most votes</h1>
      <p> {parse(htmlString)} </p>   
    </div>
  )
}

export default App