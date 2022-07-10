<template>
    <ul id="product_list" style="margin-top: 70px">
        <div :key="element.name" v-for="element in elements">
            <CatalogItem :text="element.name" :product_id="element.id"></CatalogItem>
        </div>
    </ul>
</template>

<script>
import CatalogItem from './CatalogItem.vue';
/* eslint-disable */ 

export default{
    components: {
        CatalogItem
    },
    data: function() {
        return {
            elements: []
        }
    },
    created: async function() {
        const CATALOG_API = 'http://localhost:8080/catalog'
        await fetch(CATALOG_API+window.location.search, {
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
