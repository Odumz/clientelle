import axios from 'axios'
import Swal from 'sweetalert2'

const baseUrl = 'https://protranslating.herokuapp.com/api/v1'

export const fetchData = async (url) => {
  return await axios.get(url)
    .then(response => response.data
    )
    .catch(error => {
      console.log(error)
    })
}

export const addData = async (url, data) => {
  // const newData = JSON.stringify(data)
  // console.log('i am here now')
  console.log('currently data', data)
  // console.log('object keys of current data', Object.keys(data))
  // const newData = JSON.stringify(data)
  // console.log('newData', newData)
  // console.log('current data name', data.name)
  // console.log('current data email', data.email)
  // console.log('current data phone', data.phone)
  // console.log('current data provider', data.provider)
  await axios.post(url, data, { headers: { 'Content-Type': 'application/json' } })
    .then(response => {
      // console.log('i am here in processing')
      console.log('response team', response.data)
      Swal.fire('Successfully', 'added', 'success')
      // setTimeout(() => {
      //   window.location.reload()
      // }, 20500)
      return response.data
    })
    .catch((error) => {
      console.log(error.message)
      Swal.fire('Error', 'missing details', 'error')
    })
}

// export const addData = async (data) => {
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

// export const addData = async () => {
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

export const editData = async () => {
  await axios.put()
    .then()
    .catch()
}

export const removeData = async (id) => {
  await axios.delete(`${baseUrl}/clients/${id}`)
    .then(
      response => response.data.client
    )
    .catch(error => {
      console.log(error)
    })
}

export const filterData = async () => {
  await axios.get()
    .then()
    .catch()
}
