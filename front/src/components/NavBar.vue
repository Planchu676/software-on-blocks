<template>
    <div class="navbar">
        <ul>
          <li class="nomarginli">
            <ul>
              <li class="nomarginli" ><button class="button-1" @click="onClick()"><i class="fas fa-bars navbarbutton"></i></button></li>
              <li class="nomarginli" style="margin-top: 4px"><img src="../images/logoredux.png" alt=""></li>
              <li class="texttt nomarginli">Software on Blocks</li>
            </ul>
          </li>
          <li style="display: inline-block"><NavBarSearchBar></NavBarSearchBar></li>
          <li id="log_out" class="liright" onclick="sessionStorage.setItem('jwt', null)"><NavBarLink text="Log out" color="var(--navbar-bg-color)" link="home" style="{}"/></li>
          <li id="log_in" class="liright"><NavBarLink text="Log in" color="var(--navbar-bg-color)" link="login" style="{}"/></li>
          <li id="sign_up" class="liright"><NavBarLink text="Sing up" color="var(--navbar-bg-color)" link="signup" style="{}"/></li>
          <li class="liright"><NavBarLink text="Home" color="var(--navbar-bg-color)" link="home"/></li>
        </ul>
    </div>
</template>

<script>
import NavBarLink from "./NavBarLink.vue"
import NavBarSearchBar from "./NavBarSearchBar.vue"

function update_buttons(){
  if (sessionStorage.getItem("jwt") != 'null' && sessionStorage.getItem("jwt") != undefined){
    console.log("hiding")
    document.getElementById("log_in").style.display = 'none'
    document.getElementById("sign_up").style.display = 'none'
    document.getElementById("log_out").style.display = 'inline'
  }
  else {
    console.log("showing")
    document.getElementById("log_in").style.display = 'inline'
    document.getElementById("sign_up").style.display = 'inline'
    document.getElementById("log_out").style.display = 'none'
  }
}
document.onclick = update_buttons

export default {
    name: 'NavBar',
    components: {

      NavBarLink,
      NavBarSearchBar,
  },
  methods: {
    onClick() {
      this.$emit('openSB')
    }
  },  
}


</script>

<style>
    :root {
  --navbar-bg-color: #0C1537;
  --navbar-item-hover: #D82148;
  --navbar-item-active: #276749;
}
</style>

<style scoped>
img {
  margin-left:5px;
  margin-top: 2px;
  height: 40px;
  width: auto;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.nomarginli{
    border-right: 0px solid #bbb;
    border-left: 0px solid #bbb;
    margin-top: 0px;
    margin-right: 10px; 
    cursor: auto;
    float: left;
}

.liright {
    float: right;
    display: inline;
    padding: 0px 0px;
    cursor: pointer;
    border-left: 1px solid #bbb;
}

li:last-child {
  border-left: 0px solid #bbb;
  float: right;
}

.navbar {
  background-color: var(--navbar-bg-color);
  position:fixed;
  float: top;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  padding: 0em;
  overflow: auto;
}

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.texttt {
    font-size: 25px;
    font-family: 'Roboto', Light;
    display: block;
    color: white;
    text-align: center;
    padding: 10px 11px;
    text-decoration: none;
    cursor: auto;
}
</style>

