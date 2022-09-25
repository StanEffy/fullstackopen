import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useField} from "./hooks";

const CreateNew = (props) => {
    const contentInput = useField("text")
    const authorInput = useField("text")
    const infoInput = useField("text")

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const anecId = Math.round(Math.random() * 10000)
        props.addNew({
            content: contentInput.value,
            author: authorInput.value,
            info: infoInput.value,
            id: anecId,
            votes: 0
        })
        navigate('/anecdotes')
    }
    const handleReset = (e) => {
        e.preventDefault()
        contentInput.onChange(e, true)
        authorInput.onChange(e, true)
        infoInput.onChange(e, true)
    }
    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    content
                    <input {...contentInput}/>
                </label>
                <label>
                    author
                    <input {...authorInput} />
                </label>
                <label>
                    url for more info
                    <input {...infoInput}/>
                </label>
                <button>create</button>
                <button onClick={(e) => handleReset(e)}>reset</button>
            </form>
        </div>
    )

}

export default CreateNew
