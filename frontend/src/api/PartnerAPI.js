import api from './createApi'

function updatePartner(id, credentials) {
  return api.put(`/partners/${id}`, credentials)
}

async function getPartners() {
  const response = await api.get('/partners')
  return response?.data
}

async function getPartner(id) {
  const response = await api.get(`/partners/${id}`)
  return response?.data
}

function createPartner(credentials) {
  return api.post('/partners', credentials)
}

async function inactivatePartner(id) {
  try {
    return await api.put(`partners/${id}/inactive`)
  } catch (error) {
    alert('A művelet sikertelen.')
    return false
  }
}

async function activatePartner(id) {
  try {
    return await api.put(`/partners/${id}/active`)
  } catch (error) {
    alert('A művelet sikertelen.')
    return false
  }
}

export {
  updatePartner,
  getPartners,
  getPartner,
  createPartner,
  inactivatePartner,
  activatePartner,
}
