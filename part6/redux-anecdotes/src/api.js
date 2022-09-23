import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const addOne = async (obj) => {
    const response = await axios.post(baseUrl, obj)
    return response.data
}
const deleteOne = async (id) => {
    const response = await axios.delete(baseUrl +"/"+ id)
    return response
}
const updateOne = async (id, obj) => {
    const response = await axios.put(baseUrl +"/"+ id, obj)
    return response.data
}

export default { getAll,addOne,deleteOne,updateOne }
