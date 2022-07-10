<template>
    <div class="items-body-content">
        <span style="text-align: left; color: black" class="textroboto">{{text}}</span>
        <button class="narvbarlink" style="margin-right: 20px" :onclick="btn_on_click">Crer licencias para este producto</button>
    </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
    name: 'BusinessCatalogItem',
    props: {
        text: String,
        product_id: Number
    },
    methods: {
        btn_on_click: async function() {
            let jwt = sessionStorage.getItem("jwt")
            let decoded_jwt = jwt_decode(jwt)
            await this.licenceToken.mint(this.product_id, decoded_jwt.business_user_id)
        }
    }
}
</script>

<style>
.items-body-content {
  padding: 10px;
  padding-right: 0px;
  display: grid;
  grid-template-columns: 10fr 1fr;
  background-color: lightblue;
  font-size: 13px;
  grid-gap: 10px;
  border: 1px solid transparent;
  cursor: pointer;  
}
</style>