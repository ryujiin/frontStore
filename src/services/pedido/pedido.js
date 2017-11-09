import lovizApiService from './../lovizapi'

const lovizApiPedidoService = {}

lovizApiPedidoService.buscarPedido = function (pedido) {
  const token = localStorage.getItem('token')
  return lovizApiService.get(`/pedidos/${pedido}/`, {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiPedidoService.buscarPedidos = function () {
  const token = localStorage.getItem('token')
  return lovizApiService.get(`/pedidos/`, {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiPedidoService.editarPedido = function (pedido) {
  const token = localStorage.getItem('token')
  return lovizApiService.put(`/pedidos/${pedido.id}/`, pedido, {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}

// Metodo Envio
lovizApiPedidoService.getMetodoEnvio = function () {
  const token = localStorage.getItem('token')

  return lovizApiService.get('/metodos_envio/', {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}
// Metodo Pago
lovizApiPedidoService.getMetodoPago = function () {
  const token = localStorage.getItem('token')

  return lovizApiService.get('/metodos_pago/', {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}
// Pago STripe
lovizApiPedidoService.pagoStripe = function (pago) {
  return lovizApiService.post('/pago/stripe/', {
    carro: pago.carro,
    stripeToken: pago.stripeToken
  })
  .then(res => res.data)
  .catch(err => err.data)
}
// pago Paypal
lovizApiPedidoService.getpagoPaypal = function (pedido) {
  return lovizApiService.get('/pago/paypal/', {
    params: {
      carro: pedido.carro,
      pedido: pedido.pedido
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}
// Pago Mercado Pago
lovizApiPedidoService.getpagoMercadoPago = function (carro) {
  return lovizApiService.get('/get_mercado_pago/', {
    params: {
      carro: carro
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}
export default lovizApiPedidoService
