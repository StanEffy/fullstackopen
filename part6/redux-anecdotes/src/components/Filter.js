import {useDispatch} from "react-redux";
import {setFilter} from "../actionCreators/action-creators";

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (e) => {
        e.preventDefault()
        dispatch(setFilter((e.target.value).trim()))
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

export default Filter
