import lovizApiService from './../lovizapi'

const lovizApiPedidoService = {}

lovizApiPedidoService.createForm = function () {
  return lovizApiService.post('/custom/form/')
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiPedidoService.editForm = function (form) {
  return lovizApiService.put(`/custom/form/${form.id}/`, form)
  .then(res => res.data)
  .catch(err => err.data)
}

export default lovizApiPedidoService
