import axios from 'axios'
import Swal from 'sweetalert2'

export const fetchData = async (url) => {
  return await axios.get(url)
    .then(response => {
      console.log('this where i am')
      console.log('response is ', response.data.data)
      return response.data.data
    }
    )
    .catch(error => {
      console.log(error)
      return error
    })
}

export const fetchDataByID = async (url) => {
  return await axios.get(`${url}`, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
    .then(response => response.data.data
    )
    .catch(error => {
      console.log(error)
      return error
    })
}

export const addData = async (url, data) => {
  // const newData = JSON.parse(data)
  // console.log('i am here now')
  // console.log('currently data', data)
  // console.log('currently new data', newData.name)
  return await axios.post(url, data)
    .then(response => {
      // console.log('i am here in processing')
      // console.log('response team', response.data)
      Swal.fire('Successfully', 'added', 'success')
      // setTimeout(() => {
      //   window.location.reload()
      // }, 2500)
      return response.data
    })
    .catch((error) => {
      console.log('add data error', error.message)
      if (error.message.includes('409')) {
        Swal.fire('Error', 'Duplicate data submitted', 'error')
      } else if (error.message.includes('400')) {
        Swal.fire('Error', 'Invalid/Incomplete data submitted', 'error')
      }
      // Swal.fire('Error', error.message, 'error')
      // return error
    })
}

export const editData = async (url, payload) => {
  console.log('url is ', url)
  console.log('payload is ', payload)
  return await axios.put(`${url}`, payload, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
    .then(
      response => {
        console.log('response team', response.data)
        Swal.fire('Successfully', 'edited', 'success')
        return response.data
      }
    )
    .catch((error) => {
      console.log(error.message)
      if (error.message.includes('400')) {
        Swal.fire('Error', 'Invalid/Incomplete data submitted', 'error')
      }
    })
}

export const removeData = async (url) => {
  return await axios.delete(`${url}`, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
    .then(
      response => {
        // console.log('response team', response.data)
        Swal.fire('Successfully', 'deleted', 'success')
        return response.data
      }
    )
    .catch((error) => {
      console.log(error.message)
      if (error.message.includes('400')) {
        Swal.fire('Error', 'Invalid/Incomplete id submitted', 'error')
      }
    })
}

export const filterData = async () => {
  return await axios.get()
    .then()
    .catch((error) => {
      console.log(error.message)
      Swal.fire('Error', 'missing details', 'error')
      return error
    })
}
