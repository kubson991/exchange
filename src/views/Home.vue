<template>
  <div>
    <pulse-loader
      :loading="isLoading"
      :color="'green'"
      :size="'100'"
    ></pulse-loader>
    <px-assets-table v-if="!isLoading" v-bind:assets="assets"></px-assets-table>
  </div>
</template>

<script>
import pxAssetsTable from "@/components/pxAssetsTable";
import api from "@/api";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  name: "Home",
  components: { pxAssetsTable,  PulseLoader },

  data() {
    return {
      isLoading: false,
      assets: [],
    };
  },
  created() {
    this.isLoading = true;
    api
      .getAssets()
      .then((assets) => (this.assets = assets))
      .finally(() => (this.isLoading = false));
  },
};
</script>
