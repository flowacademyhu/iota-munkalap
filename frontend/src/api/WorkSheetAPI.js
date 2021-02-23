import api from './createApi'

function getWorkSheets() {
  return api.get('/worksheets')
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

export { getWorkSheets, postWorkSheet, closeWorkSheet }
