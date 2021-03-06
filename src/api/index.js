import axios from 'axios'

// api helper to fetch data from the backend
export const fetchData = async (url) => {
  try {
    const response = await axios.get(url)
    return response.data.data
  } catch (err) {
    return err
  }
}

// api helper to fetch data by ID from the backend
export const fetchDataByParams = async (url) => {
  try {
    const response = await axios.get(`${url}`, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
    return response.data.data
  } catch (err) {
    return err
  }
}

// api helper to add data to the backend
export const addData = async (url, data) => {
  try {
    const response = await axios.post(url, data)
    return response.data
  } catch (err) {
    return err
  }
}

// api helper to edit data in the backend
export const editData = async (url, payload) => {
  try {
    const response = await axios.put(url, payload)
    return response.data
  } catch (err) {
    return err
  }
}

// api helper to delete data from the backend
export const removeData = async (url) => {
  try {
    const response = await axios.delete(`${url}`)
    return response.data
  } catch (err) {
    return err
  }
}
