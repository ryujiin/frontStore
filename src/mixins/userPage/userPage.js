const UserPageMixins = {
  methods: {
    logoutUser () {
      this.eliminarSession()
      this.setCartInitialData()
      this.$router.push({name: 'home'})
    },
    cahngeValor (valor) {
      for (var index in this.tabs) {
        if (valor === index) {
          this.tabs[index] = true
        } else {
          this.tabs[index] = false
        }
      }
    }
  }
}

export default UserPageMixins
