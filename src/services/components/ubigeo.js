import lovizApiService from './../lovizapi'

const lovizUbigegoService = {}

lovizUbigegoService.getRegion = function (q) {
  return lovizApiService.get('/ubigeo/regiones/')
  .then(res => res.data)
  .catch(err => err.data)
}

lovizUbigegoService.getProvincia = function (q) {
  return lovizApiService.get('/ubigeo/provincias/', {
    params: {
      nom_dpto: q
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}

lovizUbigegoService.getDistritos = function (q) {
  return lovizApiService.get('/ubigeo/distritos/', {
    params: {
      nom_prov: q
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}

export default lovizUbigegoService
