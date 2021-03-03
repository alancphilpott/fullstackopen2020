const Notification = ({ message, type }) => {
  let notificationColor = ''

  switch (type) {
    case 'added':
    case 'success':
      notificationColor = 'green'
      break
    case 'updated':
    case 'warning':
      notificationColor = 'orange'
      break
    case 'deleted':
    case 'error':
      notificationColor = 'red'
      break
    default:
      notificationColor = 'black'
  }

  const notificationStyle = {
    color: notificationColor,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    marginBottom: 15
  }

  return message === null ? null : (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
