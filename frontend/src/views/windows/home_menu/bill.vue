<template>
  <div
    style="width: 100%; min-height: 100vh; overflow-y: auto; max-height: 100vh"
  >
  <router-link to="/menu"><i class="bi bi-box-arrow-left m-3" style="font-size: 2rem; cursor: pointer;"></i></router-link>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3">
          <h1>cuenta #{{ $route.params.id }}</h1>
        </div>
        <div class="col-lg-9 text text-right" style="position: relative">
          <button
            type="button"
            class="btn btn-primary"
            @click="addmodalproduct"
          >
            <i class="bi bi-plus-circle-fill" style="margin: 5px"></i>Agregar
            producto
          </button>
        </div>
      </div>
    </div>

    <table class="table" v-if="databill.id">
      <thead>
        <tr>
          <th scope="col">Imagen</th>
          <th scope="col">Producto</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Precio</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        <!-- Corrección: Cambiar <tdbody> a <tbody> -->
        <tr v-for="product in databill.Products" :key="product.id">
          <td scope="row">
            <img
              :src="product.Images[0].url"
              :alt="product.id"
              style="width: 60px; border-radius: 100%"
            />
          </td>
          <td>{{ product.name }}</td>

          <td>{{ product.BillProducts.quantity }}</td>
          <td>{{ parseInt(product.price) }}</td>
          <td>
            {{
              parseInt(product.BillProducts.quantity) * parseInt(product.price)
            }}
          </td>
          <id></id>
        </tr>
      </tbody>
      <tr>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col">Total:</th>
        <th scope="col">{{ getTotal(databill.Products) }}</th>
      </tr>
      <tr>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col">Total:</th>
        <th scope="col">   <button
            type="button"
            class="btn btn-primary"
            @click="paybill"
          >
           pagar
          </button></th>
      </tr>
    </table>

    <!-- MODAL ADD PRODUCT -->
    <div
      class="modal"
      v-if="modaladdproduct"
      tabindex="-1"
      style="display: block; max-height: 80vh; overflow-y: auto"
    >
      <div class="modal-dialog" v-if="idproductSelect === null">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Productos</h5>
            <div class="input-group mb-3">
              <span class="input-group-text ml-3" id="basic-addon1"
                >nombre</span
              >
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                v-model="filtersProducts.name"
              />
              <button
                type="button"
                class="btn btn-primary ml-3"
                @click="loadproducts"
              >
                buscar
              </button>
            </div>
          </div>
          <nav aria-label="Page navigation example" v-if="products.length > 0">
            <ul class="pagination">
              <li class="page-item" v-if="currentPageproduct !== 1">
                <a
                  class="page-link"
                  href="#"
                  @click="goToPage(currentPageproduct - 1)"
                  >Previous</a
                >
              </li>
              <li
                class="page-item"
                v-for="pageNumber in range(
                  currentPageproduct,
                  totalpageproduct
                )"
                :key="pageNumber"
              >
                <a class="page-link" href="#" @click="goToPage(pageNumber)">{{
                  pageNumber
                }}</a>
              </li>
              <li
                class="page-item"
                v-if="currentPageproduct !== totalpageproduct"
              >
                <a
                  class="page-link"
                  href="#"
                  @click="goToPage(currentPageproduct + 1)"
                  >Next</a
                >
              </li>
            </ul>
          </nav>
          <div class="modal-body">
            <!-- body modal  -->
            <div class="container">
              <!-- table suppliers -->
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">imagen</th>
                    <th scope="col">cantidad</th>
                    <th scope="col">disponible</th>
                    <th scope="col">agregar</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Corrección: Cambiar <tdbody> a <tbody> -->
                  <tr v-for="product in products" :key="product.id">
                    <td scope="row">
                      <img
                        :src="product.Images[0].url"
                        :alt="product.id"
                        style="width: 60px; border-radius: 100%"
                      />
                    </td>
                    <td>{{ product.name }}</td>

                    <td>{{ product.store }}</td>
                    <td style="text-align: center">
                      <i
                        class="bi bi-plus-circle-fill"
                        style="font-size: 1.5rem; color: #007bff"
                        @click="selectProduct(product)"
                      ></i>
                    </td>
                    <id></id>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- end modal -->
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="addmodalproduct"
            >
              Close
            </button>
           
          </div>
        </div>
      </div>
      <!-- second modal select cantidad product-->

      <div class="modal-dialog" v-if="idproductSelect != null">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ idproductSelect.name }}</h5>
            <img
              :src="idproductSelect.Images[0].url"
              alt="Descripción de la imagen"
              class="modal-close-image"
              style="width: 80px; border-radius: 50%"
            />
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <span
                class="input-group-text mr-2"
                id="basic-addon1"
                style="
                  background: rgb(23, 129, 174);
                  border: transparent;
                  color: white;
                "
                >Cantidad</span
              >
              <input
                type="number"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                v-model="idproductSelect.quantity"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="closeSelectProduct"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="addproductbill"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "../../../axiosInstance";
import { toast } from "vue3-toastify";
export default {
  data() {
    return {
      idproductSelect: null,
      modaladdproduct: false,
      databill: [],
      currentPageproduct: 1,
      totalpageproduct: 1,
      products: [],
      filtersProducts: {
        name: "",
        category: "",
      },
    };
  },
  methods: {
    getTotal(date) {
      const arraydata = date;
      let total = 0;
      for (var i = 0; i < arraydata.length; i++) {
        total += arraydata[i].price * arraydata[i].BillProducts.quantity;
      }
      return total;
    },
    async addproductbill() {
      try {
        const response = await axios.post("bills/addProduct", {
        idProduct: this.idproductSelect.id,
        idBills: this.$route.params.id,
        quantity: this.idproductSelect.quantity,
      });

      if (response.status === 200) {
        toast.success(response.data.ms, {
          autoClose: 1000,
        });
        this.loadproducts();
        this.loadbill();
        this.idproductSelect=null;

      }
      } catch (error) {
      const messague=error?.response?.data?.error;
        toast.error(messague||"error", {
          autoClose: 1000,
        });
      }
      
    },
    closeSelectProduct() {
  
      this.idproductSelect = null; // Cambia la variable idProduct a null
    },
    selectProduct(idProduct) {
      this.idproductSelect = idProduct;
      this.idproductSelect.quantity = 0;
    
    },
    async createbill() {
      const self = this;
      if (this.username !== "") {
        if (response.status === 200) {
          toast.success("creado correctamente", {
            autoClose: 1000,
          });
          const response = await axios.get("bills/billId/" + this.$route.params.id);
          self.databill = response.data.data;
        }
      } else {
        toast.error("no tiene nombre de cliente", {
          autoClose: 1000,
        });
      }
    },
    range(start, end) {
      return Array.from(
        { length: end - start + 1 },
        (_, index) => start + index
      );
    },

    resetmodal() {
      this.currentPageproduct = 1;
      this.filtersProducts = {
        name: "",
      };
      this.totalpageproduct = 1;
    },
    async addmodalproduct() {
      await this.resetmodal();
      await this.loadproducts();
      this.idproductSelect = null;
      this.modaladdproduct = !this.modaladdproduct;
    },
    goToPage(pageNumber) {
      this.currentPageproduct = pageNumber;
      this.loadproducts();
    },
    async loadproducts() {
      let filter = "";

      let page = `pageNumber=${this.currentPageproduct}&`;
      if (typeof this.filtersProducts === "object") {
        for (const key in this.filtersProducts) {
          if (this.filtersProducts[key] !== "") {
            filter += `${key}=${this.filtersProducts[key]}&`;
          }
        }
      }

      const response = await axios.get(`products/get?${page}${filter}`);
      
      this.products = response.data.products;
      this.currentPageproduct = response.data.currentPage;
      this.totalpageproduct = response.data.totalPages;
    },
    async paybill(){
      const response = await axios.get("bills/pay/" + this.$route.params.id);
      console.log(response.data)
      this.$router.push({path:"/menu"})
    },
    async loadbill(){
      const response = await axios.get("bills/billId/" + this.$route.params.id);
      this.databill = response.data.data;
      console.log(response.data.data)
    }
  },
  async mounted() {
   
  this.loadbill();
  },
};
</script>
