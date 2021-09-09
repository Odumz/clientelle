import axios from 'axios'

export async function fetchClient () {
  await axios.get(`${this.$baseUrl}/api/v1/clients`)
    .then(response => {
      localStorage.setItem(
        'clients',
        JSON.stringify(response)
      )
    })
    // .catch(error => {})
}

export async function addClient () {
  await axios.post()
    .then()
    .catch()
}

export async function editClient () {
  await axios.put()
    .then()
    .catch()
}

export async function removeClient () {
  await axios.delete()
    .then()
    .catch()
}

export async function filterClient () {
  await axios.get()
    .then()
    .catch()
}
