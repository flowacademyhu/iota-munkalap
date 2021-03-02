import api from './createApi'

function updatePartner(id, credentials) {
  return api.put(`/partners/${id}`, credentials)
}

function getPartners() {
  return api.get('/partners')
}

function getPartner(id) {
  return api.get(`/partners/${id}`)
}

function createPartner(credentials) {
  return api.post('/partners', credentials)
}

async function inactivatePartner(id) {
  try {
    return await api.put(`/partners/${id}/setstatus`)
  } catch (error) {
    alert('A művelet sikertelen.')
    return false
  }
}

async function activatePartner(id) {
  try {
    return await api.put(`/partners/${id}/setstatus`)
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
