<template>
<NavBar/>
<RouterView></RouterView>
</template>
<script>
import AuthUser from "./components/AuthUser.vue";
import Login from "./components/login.vue";
import navBar from "./components/navBar.vue"
import Sign from "./components/sign.vue";
import home from "./components/home.vue";
import { RouterView } from "vue-router";
import NavBar from "./components/navBar.vue";


export default{
    components : {navBar,Sign,Login,AuthUser,home}
  }
</script>

<style scoped>

</style>
