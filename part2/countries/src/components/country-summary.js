import React from 'react'

const CountrySummary = (props) => {
    console.log(props)
    const { name, showHandler } = props
    return (
        <p>{name} <button onClick={showHandler}>show</button></p>
    )
  }
  
  export default CountrySummary