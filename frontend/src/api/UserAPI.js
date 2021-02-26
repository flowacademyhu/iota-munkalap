import api from './createApi'
import axios from 'axios'

async function loginUser(credentials) {
  try {
    const result = await api.post('/login', credentials)
    return result.data.access_token
  } catch (error) {
    alert('A belépés sikertelen.')
  }
}

function postUser(credentials) {
  return api.post(`/users`, credentials)
}

function putUser(id, credentials) {
  return api.put(`/users/${id}`, credentials)
}

async function inactivateUser(id) {
  try {
    return await api.put(`/users/${id}/inactive`)
  } catch (error) {
    alert('A művelet sikertelen.')
    return false
  }
}

async function activateUser(id) {
  try {
    return await api.put(`/users/${id}/active`)
  } catch (error) {
    alert('A művelet sikertelen.')
    return false
  }
}

function getUser(id) {
  return api.get(`/users/${id}`)
}

function getUsers(searchCriteria, status) {
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
  getUsers,
  postUser,
  putUser,
  inactivateUser,
  activateUser,
  getUser,
  loginUser,
}
