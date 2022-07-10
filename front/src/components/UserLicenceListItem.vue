<template>
    <div class="items-body-content">
        <span style="text-align: left; color: black" class="textroboto">producto: {{product_name}},  licencia: {{licence_id}}</span>
        <button class="narvbarlink" style="margin-right: 20px" :onclick="btn_on_click">Poner a la venta</button>
    </div>
</template>

<script>
import { ethers } from "ethers"
import { pow } from "mathjs"

export default {
    name: 'BusinessCatalogItem',
    props: {
        licence_id_obj: Object,
        product_id: Object
    },
    data() {
        return{
            licence_id: Number,
            product_name: Number
        }
    },
    methods: {
        btn_on_click: async function() {
            this.licenceToken.approve(this.marketPlace.address, this.licence_id)
            await this.marketPlace.SaleLicence(this.licence_id, 1)
        }
    },
    async created() {
        const CATALOG_API = `http://localhost:8080/catalog?product_id=${this.product_id}`
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
                console.log(result)
            }
            this.product_name = result.list[0][0].name
            console.log(this.$props.licence_id_obj)
            this.licence_id = ethers.utils.formatUnits((this.$props.licence_id_obj),32)*pow(10, 32)
        })
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