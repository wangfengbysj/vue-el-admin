<template>
  <div class="bg-white px-3 goods_create" style="margin: -20px;margin-top: -1rem;margin-bottom: 0!important;">

    <router-link :to="{name:'shop_goods_list'}" style="position: absolute;left: 200px;top:8px">
      <el-button>返回商品列表</el-button>
    </router-link>

    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane label="基础设置">
        <base-create></base-create>
        <!--        <div style="width: 1000px">-->
        <!--          <div-->
        <!--              class="border p-3 h2"-->
        <!--              v-for="color in colors" v-dragging="{ item: color, list: colors, group: 'color' }"-->
        <!--              :key="color.text"-->
        <!--          >{{color.text}}</div>-->
        <!--        </div>-->
      </el-tab-pane>

      <el-tab-pane label="商品规格">
        <!-- 规格选项 -->
        <el-form ref="form" label-width="80px">
          <el-form-item label="商品规格" size="medium">
            <el-radio-group v-model="skus_type" @input="vModel('skus_type',$event)">
              <el-radio-button :label="0">单一规格</el-radio-button>
              <el-radio-button :label="1">多规格</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <!-- 单规格 -->
        <template v-if="skus_type===0">
          <single-attr></single-attr>
        </template>

        <!-- 多规格 -->
        <template v-else>
          <!-- 规格卡片 -->
          <el-form ref="form" label-width="80px">
            <el-form-item label="添加规格">


              <sku-card v-for="(item,index) in sku_card"
                        :key="index"
                        :item="item"
                        :index="index"
                        :total="skuCardTotal"></sku-card>

              <el-button type="success" size="mini" @click="addSkuCard">添加规格</el-button>

            </el-form-item>
          </el-form>

          <el-form ref="form" label-width="80px">
            <el-form-item label="批量设置">
              <template v-if="!updateAllStatus">
                <el-button type="text"
                           size="mini"
                           v-for="(btn,index) in updateList"
                           :key="index"
                           @click="openUpdateAllStatus(btn)">
                  {{ btn.name }}
                </el-button>
              </template>

              <div v-else class="d-flex align-items-center">
                <el-input size="small"
                          type="number"
                          class="mr-2"
                          style="width: 200px"
                          v-model="updateAllValue"
                          :placeholder="updateAllPlaceholder"></el-input>
                <el-button type="primary" size="mini" @click="updateAllSubmit">设置</el-button>
                <el-button size="mini" @click="closeUpdateAllStatus">取消</el-button>
              </div>
            </el-form-item>

            <el-form-item label="规格设置">
              <sku-table ref="table"></sku-table>
            </el-form-item>
          </el-form>
        </template>
      </el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="媒体设置">
        <el-form label-width="80px">
          <el-form-item label="商品大图">

            <div class="d-flex flex-wrap">

              <div class="d-flex align-items-center justify-content-center border rounded position-relative mr-2 mb-2"
                   style="width: 150px;height: 150px; cursor: pointer;"
                   v-for="(item,index) in banners" :key="index"
                   @click="chooseImage(index)">

                <img v-if="item.url" :src="item.url" class="w-100 h-100"/>
                <i v-else class="el-icon-plus text-muted" style="font-size: 30px"></i>

                <i class="el-icon-delete p-2 text-white position-absolute"
                   style="top:0;right:0;background-color:rgba(0,0,0,0.4)"
                   @click.stop="deleteImage(index)"></i>

              </div>


              <div v-if="banners.length < 9"
                   class="d-flex align-items-center justify-content-center border rounded position-relative mr-2 mb-2"
                   style="width: 150px;height: 150px; cursor: pointer;"
                   @click="chooseImage(-1)">

                <i class="el-icon-plus text-muted" style="font-size: 30px"></i>
              </div>

            </div>

          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品详情">
        <tinymce ref="editor" v-model="msg" @onClick="onClick"/>
      </el-tab-pane>
      <el-tab-pane label="折扣设置">折扣设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import BaseCreate from "@/components/shop/create/base-create";
import SingleAttr from "@/components/shop/create/single-attrs";
import SkuCard from "@/components/shop/create/sku/sku-card";
import SkuTable from "@/components/shop/create/sku-table";
import Tinymce from "@/components/common/tinymce";

export default {
  name: "create",
  inject: ['app'],
  components: {Tinymce, SkuTable, SkuCard, SingleAttr, BaseCreate},
  data() {
    return {
      tabIndex: 0,
      // 批量修改
      updateList: [
        {
          name: '销售价格',
          key: 'pprice'
        },
        {
          name: '市场价格',
          key: 'oprice'
        },
        {
          name: '成本价格',
          key: 'cprice'
        },
        {
          name: '库存',
          key: 'stock'
        },
        {
          name: '体积',
          key: 'volume'
        },
        {
          name: '重量',
          key: 'weight'
        },
      ],
      updateAllValue: "",
      updateAllStatus: false,
      updateAllPlaceholder: "",
      // colors: [{
      //   text: "Aquamarine"
      // }, {
      //   text: "Hotpink"
      // }, {
      //   text: "Gold"
      // }, {
      //   text: "Crimson"
      // }, {
      //   text: "Blueviolet"
      // }, {
      //   text: "Lightblue"
      // }, {
      //   text: "Cornflowerblue"
      // }, {
      //   text: "Skyblue"
      // }, {
      //   text: "Burlywood"
      // }]
      msg: 'Welcome to Use Tinymce Editor'
    }
  },
  computed: {
    ...mapState({
      skus_type: state => state.goods_create.skus_type,
      sku_card: state => state.goods_create.sku_card,
      banners: state => state.goods_create.banners
    }),

    skuCardTotal() {
      return this.sku_card.length
    }
  },
  mounted() {
    console.log(`state skus_type = ${this.skus_type}`)
    // this.$dragging.$on('dragged', ({ value }) => {
    //   console.log(value.item)
    //   console.log(value.list)
    //   console.log(value.otherData)
    // })
    // this.$dragging.$on('dragend', (e) => {
    //   console.log(JSON.stringify(e))
    //   console.log(this.colors[0].text);
    //   console.log('拖拽结束');
    //
    // })
  },
  methods: {
    ...mapMutations(['vModelState', 'addSkuCard']),
    vModel(key, value) {
      this.vModelState({key, value})
    },

    handleClick(tab, event) {
      console.log('store.skus_type=', this.$store.state.goods_create.skus_type)
    },

    onClick(e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },

    // 修改批量设置状态
    openUpdateAllStatus(item) {
      this.updateAllStatus = item.key
      this.updateAllPlaceholder = item.name
    },

    // 提交批量设置
    updateAllSubmit() {
      this.$refs.table.list.forEach(item => {
        item[this.updateAllStatus] = this.updateAllValue
      })
      this.closeUpdateAllStatus()
    },

    // 取消批量设置状态
    closeUpdateAllStatus() {
      this.updateAllValue = ""
      this.updateAllStatus = false
    },

    // 选择图片
    chooseImage(index) {
      const MAX = 9
      let count = MAX - this.banners.length
      this.app.chooseImage((res) => {
        let list = []
        if (index === -1) {
          list = [...this.banners, ...res]
        } else {
          list = [...this.banners]
          list[index] = res[0]
        }
        this.vModel("banners", list)
      }, index === -1 ? count : 1)
    },

    //删除图片
    deleteImage(index) {
      this.$confirm('是否要删除该图片?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let list = [...this.banners]
        list.splice(index, 1)
        this.vModel('banners', list)
      })
    }
  }
}
</script>

<style scoped>
.goods_create .el-form-item {
  margin-bottom: 10px;
}
</style>