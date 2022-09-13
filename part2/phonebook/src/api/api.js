import axios from "axios"

export const api = axios.create({ baseURL: "http://localhost:3001/api/persons" })

export const getNumbers = () => api.get("/").then((res) => res.data)

export const updateNumber = (id, newPerson) => api.put(`/${id}`, newPerson)

export const addNumber = (newPerson) =>
	api.post("/", newPerson).then((response) => {
		return response.data
	})

export const deleteNumber = (id) => api.delete(`/${id}`).then((res) => res)
