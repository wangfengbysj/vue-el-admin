<template>
  <div id="app">
    <router-view/>
    <image-dialog ref="imageDialog" :max="maxChooseImage"></image-dialog>
    <sku-dialog ref="skusDialog"></sku-dialog>
  </div>
</template>

<script>

import ImageDialog from "@/components/image/image-dialog";
import SkuDialog from "@/components/skus/sku-dialog";

export default {
  name: 'app',
  components: {SkuDialog, ImageDialog},
  // 依赖注入
  provide() {
    return {
      'app': this
    }
  },
  data() {
    return {
      maxChooseImage: 9
    };
  },
  methods: {
    chooseImage(callback, max = 9) {
      this.maxChooseImage = max
      this.$refs.imageDialog.chooseImage(callback)
    },
    chooseSkus(callback) {
      this.$refs.skusDialog.chooseSkus(callback)
    }
  }
}
</script>

<style>
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, .1);
  border-radius: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, .25);
  transition: color .2s ease;
}

</style>
