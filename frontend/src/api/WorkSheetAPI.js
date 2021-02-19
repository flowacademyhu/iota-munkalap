import api from './createApi'

function getWorkSheets() {
  return api.get(`/worksheets`)
}

function postWorkSheet(credentials) {
  return api.post(`/worksheets`, credentials)
}

export { getWorkSheets, postWorkSheet }
