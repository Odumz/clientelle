import axios from 'axios'

const baseUrl = 'https://protranslating.herokuapp.com/api/v1'

export const fetchClient = async () => {
  return await axios.get(`${baseUrl}/clients`)
    .then(response => response.data.client
    )
    .catch(error => {
      console.log(error)
    })
}

export const addClient = async () => {
  await axios.post()
    .then()
    .catch()
}

export const editClient = async () => {
  await axios.put()
    .then()
    .catch()
}

export const removeClient = async (id) => {
  await axios.delete(`${baseUrl}/clients/${id}`)
    .then(
      response => response.data.client
    )
    .catch(error => {
      console.log(error)
    })
}

export const filterClient = async () => {
  await axios.get()
    .then()
    .catch()
}
