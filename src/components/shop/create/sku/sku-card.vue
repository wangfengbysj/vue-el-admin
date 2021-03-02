<template>
  <div class="card mb-3" style="line-height: 1.0">
    <div class="card-header d-flex align-items-center">
      规格项：
      <el-input placeholder="请输入内容" :value="item.name"
                @input="vModel('name', index, $event)" size="mini" style="width: 250px">
        <el-button slot="append" icon="el-icon-more"></el-button>
      </el-input>

      <el-radio-group size="medium" style="margin-bottom: -10px" class="ml-2"
                      :value="item.type" @input="vModel('type', index, $event)">
        <el-radio :label="0">无</el-radio>
        <el-radio :label="1">颜色</el-radio>
        <el-radio :label="2">图片</el-radio>
      </el-radio-group>

      <!-- 上移 -->
      <el-button class="ml-auto" size="mini" icon="el-icon-top" :disabled="index === 0"
                 @click="sortCard('moveUp', index)"></el-button>
      <!-- 下移 -->
      <el-button size="mini" icon="el-icon-bottom" :disabled="index === total-1"
                 @click="sortCard('moveDown',index)"></el-button>
      <!-- 删除 -->
      <el-button size="mini" @click="delSkuCard(index)">删除</el-button>
    </div>
    <div class="card-body">
      <!-- 规格属性列表 -->
      <div class="d-flex align-items-center flex-wrap">

        <sku-card-children :type="item.type"
                           v-for="(item2,index2) in item.list"
                           :key="index2"
                           :item="item2"
                           :index="index2"
                           :cardIndex="index"
                           v-dragging="{ item: item2, list: item.list, group: `skuItem${index}` }"></sku-card-children>

      </div>
      <!-- 增加规格属性 -->
      <div>
        <el-button type="text" icon="el-icon-plus" size="mini" @click="addSkuValue(index)">增加规格值</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import SkuCardChildren from "@/components/shop/create/sku/sku-card-children";

export default {
  name: "sku-card",
  components: {SkuCardChildren},
  data() {
    return {
      list: this.item.list
    }
  },
  props: {
    item: Object,
    index: Number,
    total: Number
  },
  mounted() {
    this.$dragging.$on('dragend', (e) => {
      if (e.group === 'skuItem'+this.index){
        this.sortSkuValue({
          index: this.index,
          value: this.list
        })
      }
    })
  },
  methods: {
    ...mapMutations(['vModelSkuCard', 'delSkuCard', 'sortSkuCard', 'addSkuValue','sortSkuValue']),
    vModel(key, index, value) {
      this.vModelSkuCard({key, index, value})
    },

    //排序规格卡片
    sortCard(action, index) {
      this.sortSkuCard({action, index})
    }
  }
}
</script>

<style scoped>

</style>