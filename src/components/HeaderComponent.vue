<template>
    <b-navbar class="navbar" toggleable="lg" type="dark" variant="warning">
        <b-navbar-brand to='/'>WankoChat</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                    <em>User</em>
                </template>
                <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
    methods: {
        logout() {
            const auth = getAuth();
            signOut(auth).then(() => {
                this.$store.commit('clearLoginState')
            // Sign-out successful.
            }).catch((error) => {
            // An error happened.
                alert(error.message)
            });
        }
    },
    mounted() {
        // ログイン状態を監視して変更があったら遷移させる。
        this.$store.watch(() => this.$store.getters.isLoggedIn,
            (newValue) => {
                if (newValue) {
                    this.$router.push('chat')
                } else {
                    this.$router.push('login')
                }
            }
        )
    }
};
</script>
