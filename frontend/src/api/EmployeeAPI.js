import api from './createApi'
import axios from 'axios'

async function loginEmployee(credentials) {
  try {
    const result = await api.post('/login', credentials)
    return result.data.access_token
  } catch (error) {
    alert('A belépés sikertelen.')
  }
}

function createEmployee(credentials) {
  return api.post(`/users`, credentials)
}

function updateEmployee(id, credentials) {
  return api.put(`/users/${id}`, credentials)
}

async function updateEmployeeInactive(id) {
  try {
    return await api.put(`/users/${id}/inactive`)
  } catch (error) {
    alert('A művelet sikertelen.')
    return false
  }
}

async function activateEmployee(id) {
  try {
    return await api.put(`/users/${id}/active`)
  } catch (error) {
    alert('A művelet sikertelen.')
    return false
  }
}

async function getEmployee(id) {
  const response = await api.get(`/users/${id}`)
  return response?.data
}

function getEmployees(searchCriteria, status) {
  const source = axios.CancelToken.source()
  const request = api
    .get('/users/', {
      params: { searchCriteria, status },
      cancelToken: source.token,
    })
    .catch(function (e) {
      if (axios.isCancel(e)) {
        return { data: null }
      } else {
        throw e
      }
    })
  return { request, cancel: () => source.cancel() }
}

export {
  getEmployees,
  createEmployee,
  updateEmployee,
  updateEmployeeInactive,
  getEmployee,
  loginEmployee,
  activateEmployee,
}
