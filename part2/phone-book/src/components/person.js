import React from 'react'


const Person = (props) => {
    console.log(props)
    const { removeHandler, name, number} = props
    return (
        <p>{name} : {number} <button onClick={removeHandler}>delete</button></p>
    )
  }
  
  export default Person