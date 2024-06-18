<template>
  <div
    style="width: 100%; min-height: 100vh; overflow-y: auto; max-height: 100vh"
  >
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3">
          <h1>Inventario</h1>
        </div>
        <div class="col-lg-9 text text-right" style="position: relative">
          <button
            type="button"
            class="btn btn-light"
            @click="modalfilterbutton"
          >
            <i class="bi bi-funnel" style="margin: 5px"></i>filtros
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="addproductmodal"
          >
            <i class="bi bi-plus-circle-fill" style="margin: 5px"></i>Crear
            producto
          </button>
        </div>
      </div>
    </div>
    <!-- modal agregar producto -->

    <div
      class="modal"
      v-if="modalfilter"
      tabindex="-1"
      style="display: block; max-height: 80vh; overflow-y: auto"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Filtros</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="col-lg-12 row m-2">
              <h2 class="col-lg-3">Nombre:</h2>
              <input
                type="text"
                v-model="filters.name"
                class="form-control col-lg-9 text-right"
              />
            </div>

            <div class="col-lg-12 row m-2">
              <h2 class="col-lg-3">categoria:</h2>
              <select
                v-model="filters.category"
                class="form-select form-select-lg mb-3 col-9"
              >
                <option value="">null</option>
                <option value="metal">metal</option>
                <option value="pastico">plastico</option>
                <option value="hogar">hogar</option>
                <option value="madera">madera</option>
                <option value="deportes">deportes</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="modalfilterbutton"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="filterdata">
              Filtrar
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="modaledit"
      class="modal"
      tabindex="-1"
      style="display: block; max-height: 80vh; overflow-y: auto"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modificar Stock</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="col-lg-12 row m-2">
              <h2 class="col-lg-3">Cantidad:</h2>
              <input  v-model="selectedProduct.store"   type="number" class="form-control col-lg-9 text-right" />
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click="closemodal"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button type="button" class="btn btn-primary" @click="funtionEditProduct">Editar</button>
          </div>
        </div>
      </div>
    </div>

    <modalAddproduct
      @cerrar="addproductmodal"
      v-if="addproduct"
      @load="loadproducts"
    />
    <paginate
      :page-count="pageCount"
      :click-handler="goToPage"
      :prev-text="'Prev'"
      :next-text="'Next'"
    />

    <nav aria-label="Page navigation example" v-if="products.length > 0">
      <ul class="pagination">
        <li class="page-item" v-if="currentpage !== 1">
          <a class="page-link" href="#" @click="goToPage(currentpage - 1)"
            >Previous</a
          >
        </li>
        <li
          class="page-item"
          v-for="pageNumber in range(currentpage, totalpage)"
          :key="pageNumber"
        >
          <a class="page-link" href="#" @click="goToPage(pageNumber)">{{
            pageNumber
          }}</a>
        </li>
        <li class="page-item" v-if="currentpage !== totalpage">
          <a class="page-link" href="#" @click="goToPage(currentpage + 1)"
            >Next</a
          >
        </li>
      </ul>
    </nav>

    <div class="container">
      <div class="row">
        <div v-for="product in products" :key="product.id" class="col-md-4">
          <div class="card m-3" style="width: 100%">
            <h2 style="margin: 5px">{{ product.name }}</h2>
            <img
              :src="product.Images?.[0]?.url"
              class="card-img-top"
              alt="..."
              style="width: 100%; height: 200px; object-fit: cover"
            />
            <div class="card-body">
              <p class="card-text">{{ product.description }}</p>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Categoria</th>
                    <th scope="col">Inventario</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ product.category }}</td>
                    <td>{{ product.store }}</td>
                  </tr>
                  <button
                    type="button"
                    @click="Edit(product)"
                    class="btn btn-primary"
                  >
                    Editar
                  </button>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import modalAddproduct from "./addproduct.vue";
import axios from "../../../axiosInstance";
import { toast } from "vue3-toastify";
export default {
  data() {
    return {
      addproduct: false,
      products: [],
      currentpage: 1,
      totalpage: 1,
      modaledit: false,
      selectedProduct: null,
      filters: {
        name: "",
        category: "",
      },
      modalfilter: false,
    };
  },
  methods: {
    range(start, end) {
      return Array.from(
        { length: end - start + 1 },
        (_, index) => start + index
      );
    },
    async filterdata() {
      this.currentPage = 1;
      this.loadproducts();
    },
    closemodal() {
      this.modaledit = false;
      this.selectedProduct = null;
      this.loadproducts()
    },
    Edit(product) {
      this.selectedProduct = product
      this.modaledit = true;
      console.log(this.selectedProduct)
    },
    goToPage(pageNumber) {
      // Lógica para cambiar de página...
      // Por ejemplo, puedes emitir un evento para informar al componente padre sobre el cambio de página.
      // this.$emit('page-changed', pageNumber);
      this.currentPage = pageNumber;
      this.loadproducts();
    },
    async funtionEditProduct() {
      const self=this;
      if(this.selectedProduct){
        const response = await axios.put(`products/editstock`,{id:this.selectedProduct.id,store:this.selectedProduct.store});
        if(response.status===200){
          toast.success("producto modificado", {
          autoClose: 1000,
        });
        self.closemodal();
        }else{
          toast.error("Error al modificar producto", {
          autoClose: 1000,
        });
        }
      }
     
    },

    modalfilterbutton() {
      this.modalfilter = !this.modalfilter;
    },
    selectOption(value) {
      this.option = value;
    },
    addproductmodal() {
      this.addproduct = !this.addproduct;
    },
    async loadproducts() {
      let filter = "";

      let page = `pageNumber=${this.currentPage}&`;
      if (typeof this.filters === "object") {
        for (const key in this.filters) {
          if (this.filters[key] !== "") {
            filter += `${key}=${this.filters[key]}&`;
          }
        }
      }

      const response = await axios.get(`products/get?${page}${filter}`);
      this.products = response.data.products;
      this.currentpage = response.data.currentPage;
      this.totalpage = response.data.totalPages;
    },
  },
  mounted() {
    this.loadproducts();
  },
  components: {
    modalAddproduct,
  },
};
</script>
<style >
</style>