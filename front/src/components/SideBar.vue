<template>
    <div class="sidebar bar-block border-right" style="width:25%">
        <button @click="closeSideBar()" class="button-1 float: left"><i class="fa fa-angles-left" style="font-size: 20px"></i></button>
        <h3 class="sbitem">Menu</h3>
        <a id="create_product"  :onclick="createProduct" class="sbitem" style="display: block">Añadir producto</a>
        <a id="see your products" :onclick="businessCatalog" class="sbitem" style="display: block">Ver tus productos</a>
        <a id="see your licences" :onclick="licences" class="sbitem" style="display: block">Ver tus licencias</a>
    </div>
</template>

<script>
import jwt_decode from "jwt-decode";

function hide_business_ops(){
    let jwt = sessionStorage.getItem("jwt")
    if (jwt == 'null' || jwt == undefined){
        document.getElementById("create_product").style.display = "none"
        document.getElementById("see your products").style.display = "none"
        document.getElementById("see your licences").style.display = "none"
    }
    else{   
        let decoded_jwt = jwt_decode(jwt)
        if (decoded_jwt.business_user_id == undefined || decoded_jwt.business_user_id == 'null'){
            document.getElementById("create_product").style.display = "none"
            document.getElementById("see your products").style.display = "none"
            document.getElementById("see your licences").style.display = "block"
        }
        else{
            document.getElementById("create_product").style.display = "block"
            document.getElementById("see your products").style.display = "block"
            document.getElementById("see your licences").style.display = "block"
        }
    }
}
window.onclick = hide_business_ops

export default {
    methods: {
        openSideBar() {
            document.getElementById("SB").style.display = "block";
        },
        closeSideBar() { 
            document.getElementById("SB").style.display = "none";
        },
        createProduct() {
            window.location.href = "http://localhost:8080/create_product"
        },
        businessCatalog() {
            window.location.href = "http://localhost:8080/business_catalog"
        },
        licences() {
            window.location.href = "http://localhost:8080/user/licences"
        }
    },
}

</script>