import api from './createApi'
import moment from 'moment'

function putWorkSheet(id, credentials) {
  return api.put(`/worksheets/${id}`, credentials)
}

function getWorkSheets(startDate, endDate) {
  const minTime = moment(startDate).format('yyyy.MM.DD') + ' 00:00:00'
  const maxTime = moment(endDate).format('yyyy.MM.DD') + ' 23:59:59'
  return api.get(`/worksheets/`, {
    params: { minTime, maxTime },
  })
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

export {
  getWorkSheets,
  getWorkSheet,
  putWorkSheet,
  postWorkSheet,
  closeWorkSheet,
}
