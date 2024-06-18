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
          <h5 class="modal-title">Crear nuevo producto</h5>
    
        </div>
        <div class="modal-body">
          <div class="col-lg-12 row m-2">
            <h2 class="col-lg-3">Nombre:</h2>
            <input
              type="text"
              v-model="newProduct.name"
              class="form-control col-lg-9 text-right"
            />
          </div>
          <div class="col-lg-12 row m-2">
            <h2 class="col-lg-3">Stock:</h2>
            <input
              type="number"
              v-model="newProduct.store"
              class="form-control col-lg-9 text-right"
            />
          </div>
          <div class="col-lg-12 row m-2">
            <h2 class="col-lg-3">Categoria:</h2>
            <select
              v-model="newProduct.category"
              class="form-select form-select-lg mb-3 col-9"
            >
              <option value="metal">Metal</option>
              <option value="pastico">Plastico</option>
              <option value="hogar">Hogar</option>
              <option value="madera">Madera</option>
              <option value="deportes">Deportes</option>
            </select>
          </div>
          <div class="col-lg-12 row m-2">
            <h2 class="col-lg-3">Descripcion:</h2>
            <input
              type="text"
              v-model="newProduct.description"
              class="form-control col-lg-9 text-right"
            />
          </div>
          <div class="col-lg-12 row m-2">
            <h2 class="col-lg-3">Precio:</h2>
            <input
              type="number"
              v-model="newProduct.price"
              class="form-control col-lg-9 text-right"
            />
          </div>
          <div>
            <label for="formFileLg" class="form-label"
              >Sube imagenes del producto</label
            >
            <file-pond
              name="test"
              ref="pond"
              label-idle="Sube tus imágenes aquí..."
              v-bind:allow-multiple="true"
              accepted-file-types="image/jpeg, image/png"
              v-bind:files="images"
              v-on:update:files="handleFilesUpdate"
            
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="cerrarModal">
            Cerrar
          </button>
          <button type="button" class="btn btn-primary" @click="saveProduct">
            Crear producto
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vueFilePond from "vue-filepond";
import axios from "../../../axiosInstance";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { toast } from "vue3-toastify";
// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);
export default {
  methods: {
    cerrarModal() {
      this.$emit("cerrar");
  
    },
    load(){
      this.$emit("load");
    },
    deleteData(){
        this.newProduct={
        name: "",
        store: 0,
        category: "metal",
        description: "",
        price: 0,
      }
    },
   async  handleFilesUpdate(files) {
 
      // Actualiza el array images con los nuevos archivos
      this.images =await files.map((file) => file.file);
    },
    async saveProduct() {
        const files = this.$refs.pond.getFiles();
 
      const formData = new FormData();
      formData.append("name", this.newProduct.name);
      formData.append("store", this.newProduct.store);
      formData.append("category", this.newProduct.category);
      formData.append("description", this.newProduct.description);
      formData.append("price", this.newProduct.price);
     files.forEach((image) => {
        formData.append("files", image.file);
      });
      const response = await axios.post("products/create", formData);
      
  
      if(response.status===200){
        this.deleteData();
        toast.success("producto creado", {
          autoClose: 1000,
        });
        this.load();
        this.cerrarModal();
      }
      console.log(response.data);
    },
  },
  components: {
    FilePond,
  },
  data() {
    return {
      images: [],
      newProduct: {
        name: "",
        store: 0,
        category: "metal",
        description: "",
        price: 0,
      },
    };
  },
};
</script>