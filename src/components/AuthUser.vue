<template>
  <navBar/>
    <RouterView />
  </template>
  <script>
  import { RouterView } from "vue-router";
import Login from "./login.vue";
  import navBar from "./navBar.vue"
  import Sign from "./sign.vue";
  
    export default{
      components : {navBar,Sign,Login}
    }
  </script>
  
  <style scoped>
  
  </style>
  