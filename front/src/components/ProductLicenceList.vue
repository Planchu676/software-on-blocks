<template>
    <ul id="product_list" style="margin-top: 70px">
        <div :key="element.name" v-for="element in elements">
            <ProductLicenceListItem :licence_sale_id="element.sale_id" :licence_id_obj="element.licence.id" :product_id="element.licence[3]"></ProductLicenceListItem>
        </div>
    </ul>
</template>

<script>
//import jwt_decode from "jwt-decode";
import ProductLicenceListItem from './ProductLicenceListItem.vue';

import { pow } from "mathjs"
import { ethers } from "ethers"
/* eslint-disable */ 

export default{
    components: {
        ProductLicenceListItem
    },
    data: function() {
        return {
            elements: []
        }
    },
    created: async function() {
        //const jwt = sessionStorage.getItem("jwt")
        //var decoded_jwt = jwt_decode(jwt);
        //let user_id = decoded_jwt.user_id
        let licences_market_info = []
        let licences = []
        let retrieved_licence
        let i = 0
        let for_sale_number = 0

        let licence_number = await this.marketPlace.getLength()
        console.log(licence_number)
        for(;i<licence_number;i++){
            retrieved_licence = await this.marketPlace._LicenceForSale(i)
            console.log(retrieved_licence)
            if (retrieved_licence.isSold == false){
                licences_market_info.push(retrieved_licence)
                for_sale_number++
            }
        }
        for (let j=0; j<for_sale_number; j++){
            let id = ethers.utils.formatUnits((licences_market_info[j][1]),32)*pow(10, 32)
            console.log(id)
            licences.push({licence: await this.licenceToken.Licences(id),
                           sale_id: licences_market_info[j].id})
        }
        console.log(licences)
        this.elements = licences
    }
}
</script>
