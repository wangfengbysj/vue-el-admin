<template>
  <table class="table table-bordered table-sm">
    <thead>
    <tr>
      <th scope="col"
          class="text-center"
          v-for="(th, thi) in tabelThs"
          :rowspan="th.rowspan"
          :colspan="th.colspan"
          style="vertical-align: middle"
          :key="thi">
        {{ th.name }}
      </th>
    </tr>
    <tr>
      <th scope="col"
          class="text-center"
          v-for="(th, thi) in skuLabels"
          rowspan="1"
          colspan="1">
        {{ th.name }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item,index) in tableData" :key="index">
      <th scope="row"
          v-for="(sku,skuI) in item.skus"
          :key="skuI">{{ sku.name }}
      </th>
      <td class="text-center" width="100">
        <span class="btn btn-light mr-2 border">
          <i class="el-icon-plus"></i>
        </span>
      </td>
      <td class="text-center" width="100"><input class="form-control text-center" type="number" v-model="item.pprice"/></td>
      <td class="text-center" width="100"><input class="form-control text-center" type="number" v-model="item.oprice"/></td>
      <td class="text-center" width="100"><input class="form-control text-center" type="number" v-model="item.cprice"/></td>
      <td class="text-center" width="100"><input class="form-control text-center" type="number" v-model="item.stock"/></td>
      <td class="text-center" width="100"><input class="form-control text-center" type="number" v-model="item.volume"/></td>
      <td class="text-center" width="100"><input class="form-control text-center" type="number" v-model="item.weight"/></td>
      <td class="text-center" width="100"><input class="form-control text-center" type="text" v-model="item.code"/></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: "sku-table",
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      "skuLabels",
      "tabelThs",
      "tableData"
    ]),
    ...mapState({
      sku_card: state => state.goods_create.sku_card
    })
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>