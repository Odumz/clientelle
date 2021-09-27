import axios from 'axios'
import Swal from 'sweetalert2'

// api helper to fetch data from the backend
export const fetchData = async (url) => {
  return await axios.get(url)
    .then(response => {
      return response.data.data
    }
    )
    .catch(error => {
      return error
    })
}

// api helper to fetch data by ID from the backend
export const fetchDataByID = async (url) => {
  return await axios.get(`${url}`, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
    .then(response => response.data.data
    )
    .catch(error => {
      return error
    })
}

// api helper to add data to the backend
export const addData = async (url, data) => {
  return await axios.post(url, data)
    .then(response => {
      Swal.fire({
        title: 'Successful!',
        text: 'New data added',
        timer: 1500,
        icon: 'success'
      })
      return response.data
    })
    .catch((error) => {
      if (error.message.includes('409')) {
        Swal.fire('Error', 'Duplicate data submitted', 'error')
      } else if (error.message.includes('400')) {
        Swal.fire('Error', 'Invalid/Incomplete data submitted', 'error')
      }
    })
}

// api helper to edit data in the backend
export const editData = async (url, payload) => {
  return await axios.put(url, payload)
    .then(
      response => {
        Swal.fire({
          title: 'Successful!',
          text: 'Data has been updated',
          timer: 1500,
          icon: 'success'
        })
        return response.data
      }
    )
    .catch((error) => {
      if (error.message.includes('400')) {
        Swal.fire('Error', 'Invalid/Incomplete data submitted', 'error')
      }
    })
}

// api helper to delete data from the backend
export const removeData = async (url) => {
  return await axios.delete(`${url}`)
    .then(
      response => {
        Swal.fire({
          title: 'Successful!',
          text: 'Data has been deleted',
          timer: 1500,
          icon: 'success'
        })
        return response.data
      }
    )
    .catch((error) => {
      if (error.message.includes('400')) {
        Swal.fire('Error', 'Invalid/Incomplete id submitted', 'error')
      }
    })
}
