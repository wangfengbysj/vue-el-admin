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
    <tr v-for="(item,index) in list" :key="index">
      <!-- 商品规格 -->
      <th scope="row"
          v-for="(sku,skuI) in item.skus"
          :key="skuI">{{ sku.name }}
      </th>

      <td class="text-center" width="100">
			  <span v-if="!item.image" class="btn btn-light border mr-2"
              @click="chooseImage(item)">
			  	<i class="el-icon-plus"></i>
			  </span>
        <img v-else :src="item.image" class="rounded" style="width: 45px;height: 45px;cursor: pointer;" @click="chooseImage(item)"/>
      </td>

      <td class="text-center" width="100"><input class="form-control text-center" type="number" v-model="item.pprice"/>
      </td>
      <td class="text-center" width="100"><input class="form-control text-center" type="number" v-model="item.oprice"/>
      </td>
      <td class="text-center" width="100"><input class="form-control text-center" type="number" v-model="item.cprice"/>
      </td>
      <td class="text-center" width="100"><input class="form-control text-center" type="number" v-model="item.stock"/>
      </td>
      <td class="text-center" width="100"><input class="form-control text-center" type="number" v-model="item.volume"/>
      </td>
      <td class="text-center" width="100"><input class="form-control text-center" type="number" v-model="item.weight"/>
      </td>
      <td class="text-center" width="100"><input class="form-control text-center" type="text" v-model="item.code"/></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: "sku-table",
  inject: ['app'],
  data() {
    return {
      list: []
    }
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
  watch:{
    tableData(newValue,oldValue){
      this.list = newValue
    }
  },
  mounted() {
    this.list = this.tableData
  },
  methods: {
    chooseImage(item) {
      this.app.chooseImage((res) => {
        item.image = res[0].url
      }, 1)
    }
  }
}
</script>

<style scoped>

</style>