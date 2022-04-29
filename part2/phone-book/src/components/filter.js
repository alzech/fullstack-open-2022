import React from 'react'

const Filter = (props) => {
    console.log(props)
    const { inputValue, inputHandler } = props
    return (
        <div>
            filer by name: <input value={inputValue} onChange={inputHandler} />
        </div>
    )
  }
  
  export default Filter