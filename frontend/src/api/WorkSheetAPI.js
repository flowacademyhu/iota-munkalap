import api from './createApi'

function getWorkSheets(status) {
  return api.get(`/worksheets/`, {
    params: { status },
  })
}

function postWorkSheet(credentials) {
  return api.post('/worksheets', credentials)
}

export { getWorkSheets, postWorkSheet }
