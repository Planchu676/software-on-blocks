<template>
    <div>
        <input id="input_field" type="text" placeholder="Busca aquí tu producto">
    </div>
</template>

<script>
export default {
    mounted: function(){
        const input_field = document.getElementById('input_field');
        input_field.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                window.location.href = `http://localhost:8080/catalog?product_name=${document.querySelector("input").value}`
            }
        });
    }
}
</script>

<style>
input[type=text] {
  padding: 6px;
  border: none;
  margin-top: 6px;
  margin-right: 16px;
  font-size: 17px;
  min-width:100px;
  max-width: 1000px;
  width:200px;
  height: 28px;
  flex: 1 1 auto;
  border-radius: 8px;
}

div {
    flex: 1 1 auto;
}
</style>