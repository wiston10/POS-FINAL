<template>
  <div
    class="container"
    style="width: 100%; max-height: 100vh; min-height: 100vh"
    v-if="supplier.length != {}"
  >
    <router-link to="/menu"
      ><div style="border: black; border-radius: 10px; cursor: pointer">
        <i class="bi bi-arrow-return-left"></i></div
    ></router-link>
    <div class="row">
      <div class="col-lg-6 mt-3">
        <h1 style="font-size: 2rem">{{ supplier.name }}</h1>

        <div class="row">
          <div class="col-lg-6 row">
            <h3 class="mr-2">Ciudad:</h3>
            <h3>{{ supplier.city }}</h3>
          </div>
          <div class="col-lg-6 row">
            <h3 class="mr-2">Direccion:</h3>
            <h3>{{ supplier.direction }}</h3>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-6 row">
            <h3 class="mr-2">Categoria:</h3>
            <h3>{{ supplier.category }}</h3>
          </div>
          <div class="col-lg-6 row">
            <h3>ciudad:</h3>
            <h3>{{ supplier.city }}</h3>
          </div>
        </div>
        <div class="row">
          <i class="bi bi-telephone"></i>
          <h1>Telefonos:</h1>
        </div>

        <div v-for="phone in supplier.Phones" :key="phone.id">
          <div class="card mt-2">
            <div
              class="card-body d-flex justify-content-between align-items-center"
            >
              <h5 class="card-title">{{ phone.number }}</h5>
              <a :href="'tel:+' + phone.number" class="btn btn-primary"
                >llamar</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 mt-3">
        <img
          src="../../../images/provedor.png"
          alt="imagen1"
          style="width: 100%; border-radius: 10px"
        />
      </div>
    </div>
  </div>
</template>
<script >
import axios from "../../../axiosInstance";

export default {
  data() {
    return {
      supplier: {},
    };
  },
  methods: {
    async loadsuppliers() {
      const response = await axios.get(
        `suppliers/detail/${this.$route.params.id}`
      );

      this.supplier = response.data.data;
    },
  },
  mounted() {
    this.loadsuppliers();
  },
};
</script>