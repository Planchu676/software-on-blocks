<template>
    <form id='signupform' @submit.prevent="signup" class="add-form">

    <div id='signupformname' class="form-control" style="margin-top: 70px">
      <label >Nombre</label>
      <input 
        type="text" 
        v-model="name" 
        name="user" 
        placeholder="Jairo" 
        class="textrobotoform"
        />
    </div>

    <div class="form-control">
      <label>Email</label>
      <input id='signupformemail'
        type="text"
        v-model="email"
        name="email"
        placeholder="jairo.ol@gmail.com"
        class="textrobotoform"
      />
    </div>

    <div id='signupformpassword' class="form-control">
      <label>Contraseña</label>
      <input
        type="password"
        v-model="password"
        name="password"
        placeholder="..."
        class="textrobotoform"
      />
    </div>

    <div id='signupformpassword' class="form-control">
      <input type="checkbox" id="is_business" value="Jack" v-model="is_business" name="is_business">
      <label for="is_business">¿Eres una empresa?</label>
    </div>

    <input type="submit" value="enviar" class="button-1" style="width:26%; font-size: 14px"/>
  </form>
</template>

<script>
const USER_API_URL = "http://localhost:8080/signup"
const BUSINESS_USER_API_URL = "http://localhost:8080/business/signup"


export default {
    data() {
      return {
        name: '',
        email: '',
        password: ''
      }
    },

    methods: {
      async user_signup() {
        console.log("signing up!")
              const user_params = {
                  name: this.name,
                  email: this.email,
                  password: this.password
                }
              await fetch(USER_API_URL, {
                method: 'POST',
                body: JSON.stringify(user_params),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
              .then(response => response.json())
              .then(result => {
                if (result.details) {
                  // there was an error...
                  const error = result.details
                    .map(detail => detail.message)
                    .join(". ");
                  this.error = error;
                }
                else 
                return true;
              })
      },

      async business_user_sign_up() {
        console.log("signing up!")
              const user_params = {
                  business_name: this.name,
                  email: this.email,
                  password: this.password
                }
              await fetch(BUSINESS_USER_API_URL, {
                method: 'POST',
                body: JSON.stringify(user_params),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
              .then(response => response.json())
              .then(result => {
                if (result.details) {
                  // there was an error...
                  const error = result.details
                    .map(detail => detail.message)
                    .join(". ");
                  this.error = error;
                }
                else 
                return true;
              })
      },

      async signup(){
        if(this.is_business == true)
          await this.business_user_sign_up()
        else
          await this.user_signup()
        window.location.href = "http://localhost:8080/login"
      },
    }
}
</script>

<style scoped>
label {
  display: block;
}
input[type=text], input[type=password], select {
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  height: 35px;
}

input[type=submit] {
    float: right;
    margin-right: 26%;

}
div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>