import {connect} from "react-redux";

const Notification = ({notification}) => {

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

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}
const mapDispatchToProps = {

}
export default connect(mapStateToProps,
    mapDispatchToProps)(Notification)
