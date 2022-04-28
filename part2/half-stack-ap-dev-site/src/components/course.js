import React from 'react'

const Course = (props) => {
    console.log(props)
    const { course } = props
    return (
      <>
        <Header name={course.name}/>
        <Content parts={course.parts}/> 
      </>
    )
  }
  
  const Header = (props) => {
    console.log(props)
    const { name } = props
    return (
      <>
        <h1>{name}</h1> 
      </>
    )
  }
  
  const Content = (props) => {
    console.log(props)
    const { parts } = props
    const sum = parts.reduce((sum, item) => sum+item.exercises, 0)
    return (
      <>
        { parts.map(item => <Part key={item.id} part={item} />)}
        <Total total={sum} />
      </>
    )
  }
  
  const Part = (props) => {
    console.log(props)
    const { part } = props
    return (
      <>
        <p>{part.name} {part.exercises}</p>
      </>
    )
  }
  
  const Total = (props) => {
    console.log(props)
    const { total } = props
    return (
      <>
        <p><b>total of {total} exercises</b></p> 
      </>
    )
  }

  export default Course