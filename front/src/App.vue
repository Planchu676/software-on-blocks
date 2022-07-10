<template>
  <div>
    <NavBar @openSB="openSB()"/>
    <SideBar id="SB"/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'

export default {

  components: {
    NavBar,
    SideBar,
  },

  methods: {
    openSB(){
      console.log("boton sidebar activo");
      document.getElementById("SB").style.display = "block";
    }
  },
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>