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

export const addClient = async (data) => {
  const newData = JSON.stringify(data)
  console.log('i am here now')
  console.log('current data', newData)
  console.log('current data name', data.name)
  console.log('current data email', data.email)
  console.log('current data phone', data.phone)
  console.log('current data provider', data.provider)
  await axios.post(`${baseUrl}/clients/add`, newData)
    .then(response => {
      console.log('i am here')
      console.log('response team', response)
      return response
    })
    .catch((error) => {
      console.log(error.response.data)
    })
}

// export const addClient = async (data) => {
//   console.log('i am here now')
//   console.log('current data', data)
//   console.log('current data name', data.name)
//   console.log('current data email', data.email)
//   console.log('current data phone', data.phone)
//   console.log('current data provider', data.provider)
//   await axios.post(`${baseUrl}/clients/add`, {
//     name: data.name,
//     email: data.email,
//     phone: data.phone,
//     provider: data.provider
//   })
//     .then(response => {
//       console.log('i am here')
//       console.log('response team', response)
//       return response
//     })
//     .catch((error) => {
//       console.log(error.response.data)
//     })
// }

// export const addClient = async () => {
//   console.log('i am here now')
//   console.log('current data')
//   await axios.post(`${baseUrl}/clients/add`, {
//     name: 'test',
//     email: 'someemail@ascom.sop',
//     phone: '123456789',
//     provider: ['provider1', 'provider3']
//   })
//     .then(response => {
//       console.log('i am here')
//       console.log('response team', response)
//     })
//     .catch((error) => {
//       console.log(error.response.data)
//     })
// }

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
