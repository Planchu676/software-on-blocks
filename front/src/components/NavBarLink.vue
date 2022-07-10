<template>
    <div>
        <li>
            <a  class="navbarlink" @click="$router.push({name: $props.link})">
                {{text}}
            </a>
        </li>
            
    </div>
</template>

<script>
export default {
    name: 'NavBarButton',
    props: {
        text: String,
        color: String,
        link: String,
    },
}
</script>

<style scoped>
</style>