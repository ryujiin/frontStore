import lovizApiService from './../lovizapi'

const lovizApiProductoService = {}

lovizApiProductoService.getProductos = function (q) {
  return lovizApiService.get('/catalogo/productos/', {
    params: q
  })
    .then(res => res.data)
    .catch(err => err.data)
}

lovizApiProductoService.getProductoSingle = function (q) {
  return lovizApiService.get('/catalogo/producto-single/', {
    params: q
  })
    .then(res => res.data)
    .catch(err => err.data)
}

lovizApiProductoService.getCategorias = function () {
  return lovizApiService.get('/categoria/')
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiProductoService.getEtiquetas = function () {
  return lovizApiService.get('/etiquetas/')
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiProductoService.createComentarioProducto = function (comentario) {
  return lovizApiService.post('/comentarios/', comentario)
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiProductoService.updateComentarioProducto = function (comentario) {
  return lovizApiService.put(`/comentarios/${comentario.id}/`, comentario)
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiProductoService.getComentarioProducto = function (p) {
  return lovizApiService.get('/comentarios/', {
    params: {
      producto: p
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}
// Administracion
lovizApiProductoService.getProductosAdmin = function (q) {
  return lovizApiService.get('/catalogo/productos/', {
    params: q
  })
    .then(res => res.data)
    .catch(err => err.data)
}

lovizApiProductoService.getProductoSingleAdmin = function (id) {
  return lovizApiService.get(`/catalogo/producto-single/${id}`)
    .then(res => res.data)
    .catch(err => err.data)
}

export default lovizApiProductoService
