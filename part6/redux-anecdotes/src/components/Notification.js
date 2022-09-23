import {useSelector} from "react-redux";
import {useEffect} from "react";

const Notification = () => {

  const notification = useSelector(state => state.notification)
  useEffect(() => {

  }, [notification])
  const style = {
    border: 'solid',
    borderColor: notification.type === "success" ? "green" : "red",
    color:  notification.type === "success" ? "green" : "red",
    padding: 10,
    borderWidth: 1
  }
  return (
      <>
        {(notification.type) ? <div style={style}>
          {notification.message}
        </div>: null}
      </>


  )
}

export default Notification
