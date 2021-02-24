import api from './createApi'

function putWorkSheet(id, credentials) {
  return api.put(`/worksheets/${id}`, credentials)
}

function getWorkSheets() {
  return api.get('/worksheets')
}

function getWorkSheet(id) {
  return api.get(`/worksheets/${id}`)
}

function postWorkSheet(credentials) {
  return api.post('/worksheets', credentials)
}

async function closeWorkSheet(id) {
  try {
    return await api.put(`/worksheets/${id}/close`)
  } catch (error) {
    alert('A művelet sikertelen.')
  }
}

async function finalizeWorkSheet(id) {
  try {
    return await api.put(`/worksheets/${id}/finalize`)
  } catch (error) {
    alert('A művelet sikertelen.')
  }
}

export {
  getWorkSheets,
  getWorkSheet,
  putWorkSheet,
  postWorkSheet,
  closeWorkSheet,
  finalizeWorkSheet,
}
