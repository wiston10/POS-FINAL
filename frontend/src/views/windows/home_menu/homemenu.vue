<template>
  <div
    class="container"
    style="width: 100%; min-height: 100vh; overflow-y: auto; max-height: 100vh"
  >

    <div class="row">
      <div
        class="col-lg-12 row"
        style="border-bottom: solid 3px rgb(183, 181, 181)"
      >
        <div
          class="col-lg-4 section"
          @click="selectmodal('actives')"
          :style="{
            borderBottom: modal === 'actives' ? 'solid 3px black' : '',
          }"
        >
          Activas
        </div>
        <div
          class="col-lg-4 section"
          @click="selectmodal('record')"
          :style="{ borderBottom: modal === 'record' ? 'solid 3px black' : '' }"
        >
          Historial
        </div>
        <div
          class="col-lg-4 section text-center"
          style=""
          @click="selectmodal('newBill')"
          :style="{
            borderBottom: modal === 'newBill' ? 'solid 3px black' : '',
          }"
        >
          Crear factura
        </div>
      </div>
    </div>
    <div style="width: 100%;">
        <actives v-if="modal==='actives'"/>
        <createbill v-if="modal === 'newBill'" :funtionProp="selectmodal" />
        <history  v-if="modal==='record'"/>
    </div>
  </div>
</template>
<script>
import actives from "./actives.vue";
import createbill from "./createbill.vue";
import history from "./histoy.vue";
export default {
  components: {
    actives,
    createbill,
    history,
  },

  data() {
    return {
      modal: "actives",
    };
  },
  methods: {
    selectmodal(modalselect) {
      this.modal = modalselect;
    },
  },
};
</script>


    <style>
.section {
  cursor: pointer;
}
</style>