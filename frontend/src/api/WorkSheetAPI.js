import api from './createApi'
import moment from 'moment'

function updateWorkSheet(id, credentials) {
  return api.put(`/worksheets/${id}`, credentials)
}

async function getWorkSheets(startDate, endDate, status) {
  const minTime = startDate ? moment(startDate).format('yyyy.MM.DD') : null
  const maxTime = endDate ? moment(endDate).format('yyyy.MM.DD') : null
  const response =
    status === 'ALL'
      ? await api.get(`/worksheets/`, {
          params: { minTime, maxTime },
        })
      : await api.get(`/worksheets/`, {
          params: { minTime, maxTime, status },
        })
  return response?.data
}

async function getWorkSheet(id) {
  const response = await api.get(`/worksheets/${id}`)
  return response?.data
}

function createWorkSheet(credentials) {
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
  updateWorkSheet,
  createWorkSheet,
  closeWorkSheet,
  finalizeWorkSheet,
}
