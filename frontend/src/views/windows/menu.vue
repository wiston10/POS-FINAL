<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-2" style="background: #f6f8f9; height: 100vh">
        <div class="container-fluid p-4 divoption" @click="selectOption('/homemenu')" :style="{ background: option === '/homemenu' ? '#28A5F1 ' : '#f6f8f9' ,color:option==='/homemenu'?'white':'black'}" >
          <i class="bi bi-house-door-fill icon" ></i>
          <h1>Home</h1>
        </div>
        <div class="container-fluid p-4 divoption" @click="selectOption('/suppliers')" :style="{ background: option === '/suppliers' ? '#28A5F1 ' : '#f6f8f9',color:option==='/suppliers'?'white':'black' }">
          <i class="bi bi-person-vcard-fill icon"></i>
          <h1>Provedores</h1>
        </div>
        <div class="container-fluid p-4 divoption" @click="selectOption('/inventarie')" :style="{ background: option === '/inventarie' ? '#28A5F1 ' : '#f6f8f9' ,color:option==='/inventarie'?'white':'black'}">
          <i class="bi bi-archive icon"></i>
          <h1>Inventario</h1>
        </div>
        <div class="container-fluid p-4 divoption" @click="selectOption('/perfil')" :style="{ background: option === '/perfil' ? '#28A5F1 ' : '#f6f8f9' ,color:option==='/perfil'?'white':'black'}" >
          <i class="bi bi-person-circle icon" ></i>
          <h1>Perfil</h1>
        </div>
        <button type="button" @click="close" class="btn btn-primary col-lg-12"
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem; background-color: rgb(207, 18, 18);">
          Salir 
        </button>
      </div>
      <div class="col-lg-10" style="background: #ffffff">
      <!-- this section is options -->  
        <inventarie v-if="option==='/inventarie'" />
        <datauser v-if="option==='/perfil'"/>
        <suppliers v-if="option==='/suppliers'"/>
        <homemenu v-if="option==='/homemenu'"/>
      </div>
    </div>
  </div>
 
  
 
</template> 
<script >
  import inventarie from './inventarie/inventarie.vue';
  import datauser from './perfil/datauser.vue';
  import suppliers from './suppliers/suppliers.vue';
  import homemenu from './home_menu/homemenu.vue';
  
  
  
  export default{
    components: {
      inventarie,
      datauser,
      suppliers,
      homemenu,
      
      
  },
  data() {
    return {
      option: "/homemenu",
    };
  },
  methods: {
    selectOption(value){
      this.option=value;
    },
    close() {
      this.$store.dispatch("close",{})   
    this.$router.push({path:`/`});
    }
  },
};


</script>

<style >
.icon {
  padding-right: 5px;
  padding-bottom: 5px;
}
.divoption{
  display: flex; cursor: pointer;
  transition: 0.7s;
}
.divoption:hover{
  background: rgb(181, 181, 181);
  color: white;
}
</style>

//// agregar modal, agregar script /////////

