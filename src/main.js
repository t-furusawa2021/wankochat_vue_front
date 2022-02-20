import { initializeApp } from 'firebase/app'
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
require('@/assets/sass/main.scss')
// Initialize Firebase
const config = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID,
    measurementId: process.env.VUE_APP_MESUREMENT_ID,
    databaseURL: process.env.VUE_APP_DATABASE_URL
}
const app = initializeApp(config)
getDatabase(app);
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false
const isLoggedIn = () => {
    return new Promise(resolve => {
        const auth = getAuth()
        // ログイン状態が変更したタイミングでも発火する。
        onAuthStateChanged(auth, (user) => {
            if (user) {
                store.commit('setLoginState')
            } else {
                store.commit('clearLoginState')
            }
            resolve()
        })
    })
}
router.beforeEach(async (to, from, next) => {
    await isLoggedIn()
    if (to.matched.some(record => record.meta.authOnly)) {
        if (store.state.isLoggedIn) {
            next();
        } else {
            next("/login");
        }
    } else if (to.matched.some(record => record.meta.guestOnly)) {
        if (!store.state.isLoggedIn) {
            next(); // 未ログインでゲスト画面ならばそのまま遷移させる。
        } else { // ログイン状態なのでチャット画面に遷移させる。
            next('/chat');
        }
    } else {
        next();
    }   
});
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')