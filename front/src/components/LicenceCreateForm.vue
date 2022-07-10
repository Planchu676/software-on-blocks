<template>
    <form id='licencecreateform' @submit.prevent="create_licence" class="add-form">

    <div id='licencecreateformquantity' class="form-control" style="margin-top: 70px">
      <label >Cantidad</label>
      <input 
        type="text" 
        v-model="name" 
        name="name" 
        placeholder="Mapachito274" 
        class="textrobotoform"
        />
    </div>

    <input type="submit" value="enviar" class="button-1" style="width:26%; font-size: 14px"/>
  </form>
</template>

<script>
import jwt_decode from "jwt-decode";
import { useRoute } from 'vue-router'

export default {
    data() {
      return {
        name: '',
        product_id: Number
      }
    },

    methods: {
      async create_licence() {
        let jwt = sessionStorage.getItem("jwt")
        let decoded_jwt = jwt_decode(jwt)
        await this.licenceToken.mint(this.product_id, decoded_jwt.business_user_id)
      },
    },
    created() {
      const route = useRoute()
      this.product_id = route.params.product_id
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