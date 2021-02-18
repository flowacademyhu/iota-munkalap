import api from './createApi'

async function loginUser(credentials) {
  try {
    const result = await api.post('/login', credentials)
    return result.data.access_token
  } catch (error) {
    alert('A belépés sikertelen.')
  }
}

function getUsers() {
  return api.get(`/users`)
}

function postUser(credentials) {
  return api.post(`/users`, credentials)
}

function putUser(id, credentials) {
  return api.put(`/users/${id}`, credentials)
}

async function putUserInactive(id) {
  try {
    return await api.put(`/users/${id}/inactive`)
  } catch (error) {
    alert('A művelet sikertelen.')
    return false
  }
}
function getUser(id) {
  return api.get(`/users/${id}`)
}

export { getUsers, postUser, putUser, putUserInactive, getUser, loginUser }
