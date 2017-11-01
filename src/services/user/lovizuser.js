import lovizApiService from './../lovizapi'

const lovizApiUserService = {}

lovizApiUserService.getTokenUser = function (user, pass) {
  return lovizApiService.post('/api-token-auth/', {
    username: user,
    password: pass
  })
    .then(res => res.data)
    .catch(err => err.data)
}

lovizApiUserService.getPerfil = function (token) {
  return lovizApiService.get('/api/user/perfil/', {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
    .then(res => res.data)
    .catch(err => err.data)
}

lovizApiUserService.crearDireccion = function (direccion) {
  const token = localStorage.getItem('token')

  return lovizApiService.post('/cliente/direcciones/', direccion, {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiUserService.crearUser = function (cuenta) {
  return lovizApiService.post('/ajax/crear/', cuenta)
  .then(res => res.data)
  .catch(err => err.data)
}

export default lovizApiUserService
