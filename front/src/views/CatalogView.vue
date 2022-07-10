<template>
  <div class="LogIn">
    <Catalog id="catalog"></Catalog>
  </div>
</template>

<script>
// @ is an alias to /src
import Catalog from '../components/CatalogComponent.vue'


export default {
  components: {
    Catalog
  },
  data: function() {
    return {
        elements: []
    }
  }
}
// eslint-disable-next-line

</script>
