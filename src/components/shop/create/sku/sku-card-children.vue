<template>
  <div class="border py-2 px-4 rounded mr-2 position-relative d-flex align-items-center">

    <div class="mr-2">
      <!-- 颜色选择器 -->
      <el-color-picker size="mini" v-if="type === 1"></el-color-picker>
      <!-- 图片选择 -->
      <span class="btn btn-light border" v-else>
        <i class="el-icon-plus"></i>
      </span>
    </div>

    <input type="text" :value="item.name" class="form-control text-center" style="width: 80px;font-size: 15px">

    <span class="btn btn-light p-0 position-absolute"
          style="line-height: 1.0;right:-5px;top:-5px"
    @click="delSkuValue({cardIndex:cardIndex, valueIndex:index})">
      <i class="el-icon-circle-close"></i>
    </span>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: "sku-card-children",
  props: {
    type: {
      type: Number,
      default: 0
    },
    item: Object,
    index: Number,
    cardIndex: Number
  },
  methods:{
    ...mapMutations(['delSkuValue'])
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>