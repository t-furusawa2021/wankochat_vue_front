import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        isLoggedIn: false
    },
    getters: {
        isLoggedIn(state) { 
            return state.isLoggedIn
        }
    },
    mutations: {
        setLoginState (state) {
          state.isLoggedIn = true
        },
        clearLoginState (state) {
          state.isLoggedIn = false
        }
    }
})
export default store