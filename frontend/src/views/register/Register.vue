

<template>
  <!-- nav bar -->
  <div style="overflow: hidden; width: 100vw; height: 100vh">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-6 mt-5" style="overflow: auto">
          <div class="col-lg-8 mx-auto">
            <h2>Registro</h2>
            <p>
              Registrate en nuestra plataforma para resivir nuestro servicio
            </p>

            <h2>Tu nombre</h2>
            <input
              v-model="name"
              type="text"
              class="form-control"
              id="name"
              placeholder="Ingresa tu name"
            />
            <h2 class="mt-3">Email</h2>
            <input
              v-model="gmail"
              type="text"
              class="form-control"
              id="name"
              placeholder="Ingresa tu name"
            />
            <h2 class="mt-3">Contraseña</h2>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="name"
              placeholder="Ingresa tu name"
            />

            <button
              type="button"
              class="btn btn-success mt-3"
              style="width: 100%"
              @click="register"
            >
              Registrate
            </button>
          </div>
        </div>
        <div class="col-lg-6">
          <img src="@/images/register.jpg" alt="image" style="width: 200vh" />
        </div>
      </div>
    </div>
  </div>
</template>

  <script >
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  data() {
    return {
      name: "",
      gmail: "",
      password: "",
    };
  },
  methods: {
    resetdata() {
      this.name = "";
      this.gmail = "";
      this.password = "";
    },
    async register() {
      try {
        const data = await this.$store.dispatch("register", {
          name: this.name,
          password: this.password,
          gmail: this.gmail,
        });
        this.resetdata();
        toast.success("Cuenta creada correctamente", {
          autoClose: 1000,
        });
        this.$router.push({ path: '/' });
    
      } catch (error) {
        toast.error(error.message, { autoClose: 1000 });
      }
    },
  },
};
</script>
  