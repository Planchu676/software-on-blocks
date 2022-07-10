<template>
  <div class="LogIn">
    <LogInForm></LogInForm>
  </div>
</template>

<script>
// @ is an alias to /src
import LogInForm from '../components/LogInForm.vue'

export default {
  name: 'HomeView',
  components: {
    LogInForm
  }
}
</script>
