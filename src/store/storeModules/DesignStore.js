const state = {
  heroTop: false,
  userTabs: 'resumen'
}

const mutations = {
  changeHeroTop (state, valor) {
    state.heroTop = valor
  },
  changeValor (state, valor) {
    state.userTabs = valor
  }
}

const getters = {
  getHeroTop: state => state.heroTop,
  getUserTabs: state => state.userTabs
}

export default{
  state,
  mutations,
  getters
}
