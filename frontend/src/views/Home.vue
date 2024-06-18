

<template>
  <!-- nav bar -->
  <div>
  
  <div
      class="modal"
       v-if="modalLogin"
      tabindex="-1"
      style="display: block; max-height: 80vh; overflow-y: auto"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Login</h5>
           
          </div>
          <div class="modal-body">
            <div class="col-lg-12 row m-2">
              <h2 class="col-lg-3">Correo:</h2>
              <input v-model="gmail"
                type="text"
              
                class="form-control col-lg-9 text-right"
              />
            </div>

            <div class="col-lg-12 row m-2">
              <h2 class="col-lg-3">Password:</h2>
              <input v-model="contraseña"
                type="text"
               
                class="form-control col-lg-9 text-right"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button @click="openmodalLogin"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="Logear"  >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  
  
  

    <div class="container-fluid mt-5">
      <div class="row g-0 text-center">
        <div class="col-lg-6">
          <div class="row">
            <div class="col-lg-3">
              <h3 style="font-size: 1rem;">SENA</h3>
            </div>
            <div class="col-lg-3">
              <div>
                <h3>Quienes somos?</h3>
              </div>
            </div>
            <div class="col-lg-3">
              <h3>Contactanos</h3>
            </div>
            <div class="col-lg-3">
              <h3>Socios</h3>
            </div>
          </div>
        </div>
        <div v-if="!login" class="col-lg-6"><button type="button" @click="openmodalLogin" class="btn btn-light">Ingresar</button><router-link to="/register"><button type="button" class="btn btn-dark" style="border-radius: 10px;">Crear cuenta</button></router-link></div>
        <div v-else class="col-lg-6"><router-link to="/menu"><button type="button" class="btn btn-dark" style="border-radius: 10px;">Mi menu</button></router-link></div>
      </div>
    </div>
    <div class="container col-lg-10 mt-5 pb-5">
      <div class="row">
        <div class="col-lg-6 mt-5">
          <div class="col-lg-10">
          <h1 style="font-weight: bold; font-size: 2.2rem;">Sistema pos sena</h1>
      
          <h1 class="mt-5">
            Un sistema de punto de venta (POS) es una herramienta esencial en entornos comerciales, permitiendo realizar transacciones de ventas de manera eficiente. Compuesto por hardware y software, un POS facilita el proceso de compra al integrar funciones como escaneo de productos, gestión de inventario, y procesamiento de pagos.
          </h1>
        </div>
        </div>
        <div class="col-lg-6 text-center">
          <img src="../images/menu_1.jpg" alt="imagen1"  style="width: 250px;border-radius: 10px;"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import { toast } from "vue3-toastify"; 
  export default {
    computed: {
      user() {
        return this.$store.getters.currentUser;
      },
      login() {
        return this.$store.getters.isLoggedIn ;
      }

    },
  data() {
    return { modalLogin:false,
      gmail:"",
      contraseña:""
 
    };
  },
 
  methods: {
    openmodalLogin(){
      this.modalLogin=!this.modalLogin;
    },
    async Logear(){ 
    const response=  await this.$store.dispatch('login', { gmail: this.gmail, password: this.contraseña })
    console.log(response)
    const state = response && response.token ? true : false;
    if(state===true){
      // this.openmodalLogin()
      window.location.reload();

    }
    else{
      toast.error("error al iniciar sesion",{
   
          autoClose: 1000,
  
      });
    }
    } 
  },
};
 
</script>