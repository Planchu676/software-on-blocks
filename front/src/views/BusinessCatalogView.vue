<template>
  <div class="LogIn">
    <BusinessCatalog id="catalog"></BusinessCatalog>
  </div>
</template>

<script>
// @ is an alias to /src
import BusinessCatalog from '../components/BusinessCatalog.vue'


export default {
  components: {
    BusinessCatalog
  },
  data: function() {
    return {
        elements: []
    }
  }
}
// eslint-disable-next-line

</script>
