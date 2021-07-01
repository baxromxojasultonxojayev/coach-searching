export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    })
 
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    })
  },

  async auth(context, payload) {
    const mode = payload.mode
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1LHgfsfGYhrbCN6gtYLTPr-BCdlzYS6I`

    if(mode == 'signup'){
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyA1LHgfsfGYhrbCN6gtYLTPr-BCdlzYS6I`
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    })
     
    const responseData = await response.json()

    if(!response.ok){
      const error = new Error(responseData.message || 'Failed authorithation, please check name or password')
      throw error
    }

    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('userId', responseData.localId)

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    })
  },

  tryLogin(context){
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    if(token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        tokenExpiration: null
      })
    }
  },
  logout(context){
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null
    })
  },

  autoLogout(context){
    context.dispatch('logout')
    context.commit('setLogout')
  }
}