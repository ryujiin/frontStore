const state = {
  tienda: {
    telefono: '(511) 556-3367',
    email: 'admin@lovizdc.com',
    locacion: 'Calle los Alamos #349, Urb La Alborada Comas Lima',
    precio: 'S/. 50.00',
    menuTop: [
      {
        texto: 'Mujer',
        link: '/catalogo/mujer',
        hijos: [
          {texto: 'Pantuflas', link: '/catalogo/pantuflas-mujer/'}
        ]
      },
      {texto: 'Hombre', link: '/catalogo/hombre'},
      {texto: 'Kids', link: '/catalogo/Kids'},
      {texto: 'Oferta', link: '/catalogo/oferta'}
    ]
  }
}

const mutations = {
}

const getters = {
  getTienda: state => state.tienda
}

export default{
  state,
  mutations,
  getters
}
