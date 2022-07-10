<template>
  <div class="LogIn">
    <ProductCreateForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCreateForm from '../components/ProductCreateForm.vue'

export default {
  name: 'HomeView',
  components: {
    ProductCreateForm
  }
}
</script>
