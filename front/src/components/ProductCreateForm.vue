<template>
    <form id='productcreateform' @submit.prevent="create_product" class="add-form">

    <div id='productcreateformname' class="form-control" style="margin-top: 70px">
      <label >Nombre</label>
      <input 
        type="text" 
        v-model="name" 
        name="name" 
        placeholder="Snakes" 
        class="textrobotoform"
        />
    </div>

    <input type="submit" value="enviar" class="button-1" style="width:26%; font-size: 14px"/>
  </form>
</template>

<script>
const PRODUCT_CREATE_API_URL = "http://localhost:8080/product/create"
import jwt_decode from "jwt-decode";

export default {
    data() {
      return {
        name: '',
      }
    },

    methods: {
      async post_product() {
        console.log("creating product!")
            const jwt = sessionStorage.getItem("jwt")
            var decoded_jwt = jwt_decode(jwt);
            const product_params = {
                name: this.name,
                business_user_id: decoded_jwt.business_user_id
              }
            console.log(decoded_jwt)
            console.log(product_params)
            await fetch(PRODUCT_CREATE_API_URL, {
                method: 'POST',
                body: JSON.stringify(product_params),
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': jwt
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

      async create_product(){
        await this.post_product()
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