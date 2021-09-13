import axios from 'axios'
import Swal from 'sweetalert2'

export const fetchData = async (url) => {
  return await axios.get(url)
    .then(response => response.data
    )
    .catch(error => {
      console.log(error)
      return error
    })
}

export const fetchDataByID = async (url, id) => {
  return await axios.get(`${url}/${id}`)
    .then(response => response.data
    )
    .catch(error => {
      console.log(error)
      return error
    })
}

export const addData = async (url, data) => {
  // const newData = JSON.stringify(data)
  // console.log('i am here now')
  // console.log('currently data', data)
  return await axios.post(url, data, { headers: { 'Content-Type': 'application/json' } })
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
      console.log(error.message)
      Swal.fire('Error', 'missing details', 'error')
      return error
    })
}

export const editData = async (url, id, payload) => {
  return await axios.put(`${url}/${id}`, payload, { headers: { 'Content-Type': 'application/json' } })
    .then(
      response => {
        // console.log('response team', response.data)
        Swal.fire('Successfully', 'edited', 'success')
        return response.data
      }
    )
    .catch((error) => {
      console.log(error.message)
      Swal.fire('Error', 'missing details', 'error')
      return error
    })
}

export const removeData = async (url, id) => {
  return await axios.delete(`${url}/${id}`)
    .then(
      response => {
        // console.log('response team', response.data)
        Swal.fire('Successfully', 'deleted', 'success')
        return response.data
      }
    )
    .catch((error) => {
      console.log(error.message)
      Swal.fire('Error', 'missing details', 'error')
      return error
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
