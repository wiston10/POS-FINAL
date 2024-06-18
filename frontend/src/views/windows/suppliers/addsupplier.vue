<template>
  <!-- Modal add product-->
  <div
    class="modal"
    tabindex="-1"
    style="display: block; max-height: 80vh; overflow-y: auto"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Crear nuevo provedor</h5>
        </div>
        <div class="modal-body">
          <div class="col-lg-12 row m-2">
            <h2 class="col-lg-3">Nombre:</h2>
            <input
              type="text"
              v-model="newSupplier.name"
              class="form-control col-lg-9 text-right"
            />
          </div>
          <div class="col-lg-12 row m-2">
            <h2 class="col-lg-3">descripcion:</h2>
            <input
              type="text"
              v-model="newSupplier.description"
              class="form-control col-lg-9 text-right"
            />
          </div>
          <div class="col-lg-12 row m-2">
            <h2 class="col-lg-3">direccion:</h2>
            <input
              type="text"
              v-model="newSupplier.direction"
              class="form-control col-lg-9 text-right"
            />
          </div>
          <div class="col-lg-12 row m-2">
            <h2 class="col-lg-3">ciudad:</h2>
            <input
              type="text"
              v-model="newSupplier.city"
              class="form-control col-lg-9 text-right"
            />
          </div>

          <div class="col-lg-12 row m-2">
            <h2 class="col-lg-3">telefonos:</h2>
            <button @click="agregarInput" class="btn btn-primary">
              Agregar telefonos
            </button>

            <div
              v-for="(phone, index) in newSupplier.phone"
              :key="index"
              class="row col-lg-12 m-1"
            >
              <input
                v-model="newSupplier.phone[index]"
                type="number"
                class="form-control text-center row col-lg-9"
              />
              <button
                @click="eliminarInput(index)"
                class="row col-lg-3 btn btn-danger"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="cerrarModal">
            Cerrar
          </button>
          <button type="button" class="btn btn-primary" @click="saveProduct">
            Crear provedor
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
 
import axios from "../../../axiosInstance";
// Import FilePond styles

import { toast } from "vue3-toastify";
// Create component
 
export default {
  methods: {
    agregarInput() {
      this.newSupplier.phone.push(""); // Agrega un nuevo elemento vacío al array
    },
    eliminarInput(index) {
      this.newSupplier.phone.splice(index, 1); // Elimina el elemento en el índice especificado
    },
    cerrarModal() {
      this.$emit("cerrar");
    },
    load() {
      this.$emit("load");
    },
    deleteData() {
      this.newSupplier = {
        name: "",
        store: 0,
        
        description: "",
        price: 0,
      };
    },

    async saveProduct() {
      const sendData = {
        name: this.newSupplier.name,
        description: this.newSupplier.description,
       
        city: this.newSupplier.city,
        direction: this.newSupplier.direction,
        phone: this.newSupplier.phone,
      };

      const response = await axios.post("suppliers/create", sendData);
     
        if (response.status === 200) {
          this.deleteData();
          toast.success("provedor creado", {
            autoClose: 1000,
          });
          this.load();
          this.cerrarModal();
        }
    },
  },

  data() {
    return {
      images: [],
      newSupplier: {
        name: "",
        description: "",
        
        city: "",
        direction: "",
        phone: [],
      },
    };
  },
};
</script>