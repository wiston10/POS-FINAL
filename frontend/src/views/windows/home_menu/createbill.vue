<template>
    <div class="mt-3">
      <h1>Nombre cliente:</h1>
   <input class="form-control form-control-lg" type="text" placeholder="Nombre del cliente" aria-label=".form-control-lg example" v-model="username">
   <button type="button" class="btn btn-primary mt-3" @click="createbill">Crear</button>
</div>
</template>
<script>
import axios from '../../../axiosInstance'
import { toast } from "vue3-toastify";
export default {
  
    props:{
      funtionProp:{
        type:Function,
        required:true
      }
    },
    
    data() {
      return {

    
        username:''
      };
    },
    methods: {
     selectmodal(modalselect) {
        this.modal = modalselect;
        
      },
      async createbill(){
        const self=this;
        if(this.username!==''){
          const response=await axios.post('bills/create',{clientname:this.username})
         if( response.status===200){
          toast.success("Creado Correctamente", {
            autoClose: 1000,
          });
          self.funtionProp("actives");
         }
         

        }
        else{
          toast.error("no tiene nombre de cliente", {
            autoClose: 1000,
          });
        }
      }
    },

  };</script>