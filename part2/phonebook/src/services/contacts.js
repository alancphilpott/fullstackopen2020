import axios from 'axios'

const baseURL = 'http://localhost:3001/contacts'

const getAll = () => {
  const req = axios.get(baseURL)
  return req.then((res) => res.data)
}

const create = (newContact) => {
  const req = axios.post(baseURL, newContact)
  return req.then((res) => res.data)
}

const update = (id, updatedContact) => {
  const req = axios.put(`${baseURL}/${id}`, updatedContact)
  return req.then((res) => res.data)
}

const deleteOne = (id) => {
  const req = axios.delete(`${baseURL}/${id}`)
  return req.then((res) => res)
}

const contactService = { getAll, create, update, deleteOne }

export default contactService