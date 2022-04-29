import React from 'react'

const Person = (props) => {
    console.log(props)
    const { name, number } = props
    return (
        <p>{name} : {number}</p>
    )
  }
  
  export default Person