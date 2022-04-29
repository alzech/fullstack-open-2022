import React from 'react'

const AddPersonForm = (props) => {
    console.log(props)
    const { nameInput, 
            nameInputHandler, 
            numberInput, 
            numberInputHandler,
            submitFormHandler } = props
    return (
      <form onSubmit={submitFormHandler}> 
        <div>
          name: <input value={nameInput} onChange={nameInputHandler} />
        </div>
        <div>
          number: <input value={numberInput} onChange={numberInputHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }
  
  export default AddPersonForm