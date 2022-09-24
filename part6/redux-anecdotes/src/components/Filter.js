import {connect} from "react-redux";
import {setFilter} from "../actionCreators/action-creators";

const Filter = (props) => {

    const handleChange = (e) => {
        e.preventDefault()
        props.setFilter((e.target.value).trim())
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}
const mapStateToProps = () => {
}
const mapDispatchToProps = {
    setFilter
}
export default connect(mapStateToProps,
    mapDispatchToProps)(Filter)
