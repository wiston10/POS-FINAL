<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <header>
    -->
    <!-- <div class="wrapper"> -->
      <!-- <HelloWorld msg="You did it!" /> -->

      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
    <!-- </div> -->
  <!-- </header> -->
  <RouterView />
</template>
<script >
 export default {

 async mounted() {
     const token = localStorage.getItem('token');
    if (token !== null) {
    const data  =await this.$store.dispatch("login", { });    
 
    }
  
  },

};

</script>
<style scoped>
</style>
