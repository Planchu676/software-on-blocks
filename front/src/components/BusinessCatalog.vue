<template>
    <ul id="product_list" style="margin-top: 70px">
        <div :key="element.name" v-for="element in elements">
            <BusinessCatalogItem :text="element.name" :product_id="element.id"></BusinessCatalogItem>
        </div>
    </ul>
</template>

<script>
import jwt_decode from "jwt-decode";
import BusinessCatalogItem from './BusinessCatalogItem.vue';
/* eslint-disable */ 

export default{
    components: {
        BusinessCatalogItem
    },
    data: function() {
        return {
            elements: []
        }
    },
    created: async function() {
        const jwt = sessionStorage.getItem("jwt")
        var decoded_jwt = jwt_decode(jwt);
        const CATALOG_API = 'http://localhost:8080/catalog?' + `business_user_id=${decoded_jwt.business_user_id}`
        await fetch(CATALOG_API, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.details) {
                // there was an error...
                const error = result.details
                .map(detail => detail.message)
                .join(". ");
                this.error = error;
            }
            else{ 
                console.log(result.list)
            }
            result.list.forEach((sublist) => {
                sublist.forEach((product) => {
                    if (product != null){
                        console.log(this.elements)
                        this.elements.push({name: product.name, id: product.id});
                    }
                })
            })
        })
    }
}
</script>
