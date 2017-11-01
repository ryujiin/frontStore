import lovizApiService from './../lovizapi'

const lovizApiLineaServices = {}

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

lovizApiLineaServices.addLineaCart = function (linea) {
  const auth = getAutorizacion()
  return lovizApiService.post('/carro/lineas/', linea, {
    headers: auth
  })
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiLineaServices.deleteLinea = function (linea) {
  return lovizApiService.delete(`/carro/lineas/${linea}/`)
  .then(res => res.data)
  .catch(err => err.data)
}

export default lovizApiLineaServices
