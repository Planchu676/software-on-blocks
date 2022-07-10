<template>
    <form @submit.prevent="login" class="add-form">

    <div class="form-control" style="margin-top: 70px">
      <label>Email</label>
      <input id='signupformemail'
        type="text"
        v-model="email"
        name="email"
        placeholder="..."
        class="textrobotoform"
      />
    </div>

    <div class="form-control">
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

    <input type="submit" value="login" class="button-1" style="width:26%; font-size: 14px"/>
  </form>
</template>

<script>
const USER_API_URL = "http://localhost:8080/login"
const BUSINESS_USER_API_URL = "http://localhost:8080/business/login"

export default {
    methods: {
      async login(){
        console.log("loggin in!")
        const user_params = {
            email: this.email,
            password: this.password
          }
        let API_URL
        console.log(this.is_business)
        if(this.is_business == true)
          API_URL = BUSINESS_USER_API_URL
        else
          API_URL = USER_API_URL

        await fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify(user_params),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json()
        .then(result => {
           sessionStorage.setItem("jwt", result.access_token)
          }
        )
      )
      window.location.href = "http://localhost:8080"
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