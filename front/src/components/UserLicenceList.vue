<template>
    <ul id="product_list" style="margin-top: 70px">
        <div :key="element.name" v-for="element in elements">
            <UserLicenceListItem :licence_id_obj="element.id" :product_id="element[3]"></UserLicenceListItem>
        </div>
    </ul>
</template>

<script>
//import jwt_decode from "jwt-decode";
import UserLicenceListItem from './UserLicenceListItem.vue';

/* eslint-disable */ 

export default{
    components: {
        UserLicenceListItem
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
        let licences = []
        let retrieved_licence
        let i = -1
        let wallet_address = await this.signer.getAddress()
        do {
            i = i+1
            retrieved_licence = await this.licenceToken.Licences(i+1)
            console.log(retrieved_licence.id)
            console.log(retrieved_licence)
            if (wallet_address == retrieved_licence[1])
                licences.push(retrieved_licence)
        } while(retrieved_licence.id != 0 && i <10)
        console.log(licences)
        this.elements = licences
    }
}
</script>

