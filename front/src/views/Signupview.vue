<template>
  <div class="LogIn">
    <SignupForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import SignupForm from '../components/SignUpForm.vue'

export default {
  name: 'HomeView',
  components: {
    SignupForm
  }
}
</script>
