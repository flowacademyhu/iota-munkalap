import api from './createApi'

function putPartner(id, credentials) {
  return api.put(`/partners/${id}`, credentials)
}

function getPartners() {
  return api.get('/partners')
}

function getPartner(id) {
  return api.get(`/partners/${id}`)
}

function postPartner(credentials) {
  return api.post('/partners', credentials)
}

export { putPartner, getPartners, getPartner, postPartner }
