import React from 'react'

const Notification = ({ notification }) => {

  const infoStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (notification === null) {
    return null
  }

  return (
    <div style={notification.type === 'error' ? errorStyle : infoStyle}>
      {notification.message}
    </div>
  )
}

export default Notification