const state = {
  tienda: {
    telefono: '(511) 556-3367',
    email: 'admin@lovizdc.com',
    locacion: 'Calle los Alamos #349, Urb La Alborada Comas Lima',
    precio: 'S/. 50.00',
    menuTop: [
      {
        id: 1,
        texto: 'Mujer',
        link: '/catalogo/mujer',
        hijos: [
          {
            id: 1,
            texto: 'Pantuflas',
            link: '/catalogo/pantuflas-mujer/',
            hijos: [
              {id: 1, texto: 'Scuffs', link: '/catalogo/pantuflas-mujer-scuffs/'},
              {id: 2, texto: 'Botas', link: '/catalogo/pantuflas-mujer-botas/'}
            ]
          },
          {
            id: 2,
            texto: 'Zapatillas',
            link: '/catalogo/zapatillas-mujer/'
          }
        ]
      },
      {id: 2, texto: 'Hombre', link: '/catalogo/hombre'},
      {id: 3, texto: 'Kids', link: '/catalogo/Kids'},
      {id: 4, texto: 'Oferta', link: '/catalogo/oferta'}
    ]
  },
  pageloading: true,
  tiendaBusqueda: false,
  menuSlide: false

}

const mutations = {
  changePageLoading (state, valor) {
    state.pageloading = valor
  },
  changeTiendaBusqueda (state) {
    if (state.tiendaBusqueda) {
      state.tiendaBusqueda = false
    } else {
      state.tiendaBusqueda = true
    }
  },
  changeMenuSlide (state, valor) {
    state.menuSlide = valor
  }
}

const getters = {
  getTienda: state => state.tienda,
  getPageloading: state => state.pageloading,
  getTiendaBusqueda: state => state.tiendaBusqueda,
  getMenuSlide: state => state.menuSlide
}

export default{
  state,
  mutations,
  getters
}
