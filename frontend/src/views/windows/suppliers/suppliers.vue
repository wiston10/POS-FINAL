<template>
  <div
    style="width: 100%; min-height: 100vh; overflow-y: auto; max-height: 100vh"
  >
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3">
          <h1>Provedores</h1>
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
            provedor
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
              <h2 class="col-lg-3">ciudad:</h2>
              <input
                type="text"
                v-model="filters.city"
                class="form-control col-lg-9 text-right"
              />
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

    <modalAddsupplier
      @cerrar="addproductmodal"
      v-if="addproduct"
      @load="loadsuppliers"
    />
    <paginate
      :page-count="pageCount"
      :click-handler="goToPage"
      :prev-text="'Prev'"
      :next-text="'Next'"
    />

    <nav aria-label="Page navigation example" v-if="suppliers.length > 0">
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
      <!-- table suppliers -->
      <table class="table">
        <thead>
          <tr>
            <th scope="col">nombre</th>
            <th scope="col">ciudad</th>

            <th scope="col">telefono</th>
            <th scope="col">acciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- Corrección: Cambiar <tdbody> a <tbody> -->
          <tr v-for="supplier in suppliers" :key="supplier.id">
            <td scope="row">{{ supplier.name }}</td>
            <td>{{ supplier.city }}</td>

            <td>{{ supplier.Phones[0].number }}</td>
            <td>
              <router-link :to="'detailsuppliers/' + supplier.id"
                ><i class="bi bi-eye m-2 cursorhover"></i></router-link
              >
              <i class="bi bi-trash m-2 cursorhover" @click="destroy(supplier.id)"></i>
            </td>
            <id></id>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  <script >
import modalAddsupplier from "./addsupplier.vue";
import axios from "../../../axiosInstance";

export default {
  data() {
    return {
      addproduct: false,
      suppliers: [],
      currentpage: 1,
      totalpage: 1,
      filters: {
        name: "",

        city: "",
      },
      modalfilter: false,
    };
  },
  methods: {
    async destroy(id){
      const response = await axios.delete(`suppliers/delete/${id}`);
    
      this.loadsuppliers()
    },
    range(start, end) {
      return Array.from(
        { length: end - start + 1 },
        (_, index) => start + index
      );
    },
    async filterdata() {
      this.currentPage = 1;
      this.loadsuppliers();
    },
    goToPage(pageNumber) {
      // Lógica para cambiar de página...
      // Por ejemplo, puedes emitir un evento para informar al componente padre sobre el cambio de página.
      // this.$emit('page-changed', pageNumber);
      this.currentPage = pageNumber;
      this.loadsuppliers();
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
    async loadsuppliers() {
      let filter = "";

      let page = `pageNumber=${this.currentPage}&`;
      if (typeof this.filters === "object") {
        for (const key in this.filters) {
          if (this.filters[key] !== "") {
            filter += `${key}=${this.filters[key]}&`;
          }
        }
      }

      const response = await axios.get(`suppliers/get?${page}${filter}`);

      this.suppliers = response.data.data;
      this.currentpage = response.data.currentPage;
      this.totalpage = response.data.totalPages;
    },
  },
  mounted() {
    this.loadsuppliers();
  },
  components: {
    modalAddsupplier,
  },
};
</script>
  <style >
.cursorhover {
  cursor: pointer;
}
</style>