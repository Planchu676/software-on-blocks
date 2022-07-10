<template>
    <div class="items-body-content">
        <span style="text-align: left; color: black" class="textroboto">{{text}}</span>
        <button class="narvbarlink" style="margin-right: 20px" :onclick="btn_on_click">Ver licencias</button>
    </div>
</template>

<script>
export default {
    name: 'NavBarButton',
    props: {
        text: String,
        product_id: Number
    },
    methods: {
        btn_on_click: function() {
            window.location.href = `http://localhost:8080/product/${this.product_id}/licences`
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