import lovizApiService from './../lovizapi'

const lovizApiCartServices = {}
// Crear Carros
lovizApiCartServices.createCart = function (carroObject) {
  return lovizApiService.post('/api/carro/', carroObject)
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiCartServices.createCartLogin = function (carroObject) {
  const token = localStorage.getItem('token')
  return lovizApiService.post('/api/carro/', carroObject, {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}
// Buscar Carros
lovizApiCartServices.getCartCookie = function (cookie) {
  return lovizApiService.get('/api/carro/', {
    params: {
      session: cookie
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiCartServices.getCartLogin = function () {
  const token = localStorage.getItem('token')
  return lovizApiService.get('/api/carro/', {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}
// Update Carroos
lovizApiCartServices.updateCartLogin = function (carroObject) {
  const token = localStorage.getItem('token')
  return lovizApiService.put(`/api/carro/${carroObject.id}/`, carroObject, {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}

function getAutorizacion () {
  const token = localStorage.getItem('token')
  let autorizacion = {}
  if (token) {
    autorizacion = {
      'Authorization': 'JWT ' + token
    }
  }
  return autorizacion
}
lovizApiCartServices.getCartServer = function (id) {
  const auth = getAutorizacion()
  return lovizApiService.get(`/api/carro/${id}/`, {
    headers: auth
  })
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiCartServices.editarCartServer = function (carroObject) {
  const token = localStorage.getItem('token')
  if (!carroObject.propietario) {
    return
  }
  return lovizApiService.put(`/api/carro/${carroObject.id}/`, carroObject, {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}

export default lovizApiCartServices
