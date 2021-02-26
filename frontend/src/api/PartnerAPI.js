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

export { updatePartner, getPartners, getPartner, createPartner }
