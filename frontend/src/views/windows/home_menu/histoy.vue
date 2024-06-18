<template>
    <div
      style="width: 100%; min-height: 100vh; overflow-y: auto; max-height: 100vh"
    >
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3">
            <h1>cuentas</h1>
          </div>
          <div class="col-lg-9 text text-right" style="position: relative">
            <button
              type="button"
              class="btn btn-light"
              @click="modalfilterbutton"
            >
              <i class="bi bi-funnel" style="margin: 5px"></i>filtros
            </button>
          </div>
        </div>
      </div>
      <!-- modal agregar producto -->
  
      <!-- <paginate
        :page-count="pageCount"
        :click-handler="goToPage"
        :prev-text="'Prev'"
        :next-text="'Next'"
      /> -->
  
      <!-- paginade -->
      <nav aria-label="Page navigation example" v-if="bills.length">
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
      <!-- ------ -->
  
      <div class="container">
        <!-- table suppliers -->
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Fecha</th>
              <th scope="col">Estado</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <!-- Corrección: Cambiar <tdbody> a <tbody> -->
            <tr v-for="bill in bills" :key="bill.id">
              <td scope="row">{{ bill.clientname }}</td>
              <td>{{ formatDate(bill.createdAt) }}</td>
              <td>{{ bill.state }}</td>
  
              <td>
                <!-- <router-link :to="'bill/' + bill.id"
                  ><i class="bi bi-eye m-2 cursorhover"></i></router-link
                ><i class="bi bi-trash m-2 cursorhover"></i> -->
                {{ bill.total }}
              </td>
              <id></id>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  <script>
  import axios from "../../../axiosInstance";
  
  export default {
    data() {
      return {
        bills: [],
        currentpage: 1,
        totalpage: 1,
      };
    },
  
    methods: {
      async loadBillsHistory() {
        let page = `pageNumber=${this.currentPage}&`;
        const response = await axios.get(`bills/history?${page}`);
        console.log(response.data.data)
        this.bills = response.data.data;
        this.currentpage = response.data.currentPage;
        this.totalpage = response.data.totalPages;
        console.log(this.bills);
      },
  
      selectmodal(modalselect) {
        this.modal = modalselect;
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
      range(start, end) {
        return Array.from(
          { length: end - start + 1 },
          (_, index) => start + index
        );
      },
      goToPage(pageNumber) {
        // Lógica para cambiar de página...
        // Por ejemplo, puedes emitir un evento para informar al componente padre sobre el cambio de página.
        // this.$emit('page-changed', pageNumber);
        this.currentPage = pageNumber;
        this.loadBillsHistory();
      },
    },
    mounted() {
      this.loadBillsHistory();
    },
    components: {},
  };
  </script>
  
  
      <style>
  .section {
    cursor: pointer;
  }
  </style>
