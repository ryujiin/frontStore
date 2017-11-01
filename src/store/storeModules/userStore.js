import lovizApiUserService from '@/services/user/lovizuser'

const state = {
  userToken: '',
  userPerfil: {},
  loginModal: false,
  userError: false
}

const mutations = {
  setUserToken (state, token) {
    state.userToken = token
  },
  eliminarSession (state) {
    localStorage.removeItem('token')
    state.userPerfil = {}
    state.userToken = ''
  },
  setUsuarioPerfil (state, userPerfil) {
    state.userPerfil = userPerfil
  },
  changeModalLogin (state, valor) {
    state.loginModal = valor
  },
  changeUserError (state, valor) {
    state.userError = valor
  }
}

const getters = {
  getToken: state => state.userToken,
  getPerfil: state => state.userPerfil,
  getloginModal: state => state.loginModal,
  getUserError: state => state.userError
}

const actions = {
  buscarToken (context, datos) {
    const promise = new Promise(function (resolve, reject) {
      lovizApiUserService.getTokenUser(datos.user, datos.pass)
        .then(res => {
          resolve(res)
          if (res.token) {
            localStorage.setItem('token', res.token)
            context.commit('setUserToken', res.token)
          } else {
            context.commit('changeUserError', true)
          }
        })
    })
    return promise
  },
  getUserPerfil (context) {
    const promise = new Promise(function (resolve, reject) {
      lovizApiUserService.getPerfil(context.state.userToken)
        .then(res => {
          if (res.detail) {
            context.commit('changeUserError', true)
            context.commit('eliminarSession')
          } else {
            context.commit('setUsuarioPerfil', res)
          }
          resolve(res)
        })
    })
    return promise
  },
  crearUser (context, cuenta) {
    const promise = new Promise(function (resolve, reject) {
      lovizApiUserService.crearUser(cuenta)
        .then(res => {
          resolve(res)
        })
    })
    return promise
  }
}

export default{
  state,
  mutations,
  getters,
  actions
}
