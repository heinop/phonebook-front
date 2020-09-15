import React from 'react'

const Person = ({ person, handleDelete }) => {
  return (
    <div>
      {person.name} {person.number} &nbsp;
      <button onClick={handleDelete}>delete</button>
    </div>
  )
}

export default Person