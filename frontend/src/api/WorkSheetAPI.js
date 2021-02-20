import api from './createApi'

function putWorkSheet(id, credentials) {
  return api.put(`/worksheets/${id}`, credentials)
}

function getWorkSheets() {
  return api.get(`/worksheets`)
}

function postWorkSheet(credentials) {
  return api.post(`/worksheets`, credentials)
}

export { getWorkSheets, postWorkSheet, putWorkSheet }
