<template>
  <div v-if="Object.keys(userdata).length !== 0">
    <ul class="list-group">
      <li class="list-group-item">Nombre: {{ userdata.name }}</li>
      <li class="list-group-item">Correo: {{ userdata.gmail }}</li>
      <li class="list-group-item">Rol: {{ userdata.category }}</li>
    
    </ul>
  </div>
</template>

<script>
import axios from "../../../axiosInstance";
import { toast } from "vue3-toastify";

export default {
  data() {
    return {
      userdata: {}
    }
  },
  methods: {
    async loaduser() {
      try {
        const response = await axios.get('users/data');
        this.userdata = response.data.data;
        console.log(this.userdata);
      } catch (error) {
        console.error("Error while loading user data:", error);
        toast.error("Error while loading user data");
      }
    }
  },
  async mounted() {
    this.loaduser();
  },
};
</script>
