import api from './createApi'

function getWorkSheets() {
  return api.get('/worksheets')
}

function postWorkSheet(credentials) {
  return api.post('/worksheets', credentials)
}

function closeWorkSheet(id) {
  return api.put(`/worksheets/${id}/close`)
}

export { getWorkSheets, postWorkSheet, closeWorkSheet }
