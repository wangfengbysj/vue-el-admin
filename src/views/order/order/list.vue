<template>
  <div class="bg-white px-3" style="margin:-20px;margin-top:-1rem;margin-bottom: 1rem">

    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane v-for="(tab,tabI) in tabbars" :label="tab.name" :key="tabI">

        <button-search @search="searchEvent" ref="buttonSearch" placeholder="要搜索的订单号">

          <template #left>
            <el-button type="success">导出数据</el-button>
            <el-button type="danger">批量删除</el-button>
          </template>

          <template #form>
            <el-form :inline="true" :model="form" label-width="80px" class="my-1 p-0">
              <el-form-item label="订单编号" class="my-1 p-0">
                <el-input v-model="form.code" placeholder="订单编号"></el-input>
              </el-form-item>

              <el-form-item label="订单状态" class="my-1 p-0">
                <el-select v-model="form.type" placeholder="请选择订单状态">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>


              <el-form-item label="下单时间" class="my-1 p-0">
                <el-date-picker
                    v-model="form.time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="手机号" class="my-1 p-0">
                <el-input v-model="form.phone" placeholder="手机号"></el-input>
              </el-form-item>

              <el-form-item label="收货人" class="my-1 p-0">
                <el-input v-model="form.username" placeholder="收货人"></el-input>
              </el-form-item>

              <el-form-item class="my-1 px-2">
                <el-button type="info" @click="searchEvent">搜索</el-button>
                <el-button @click="clearSearch">清空筛选条件</el-button>
              </el-form-item>
            </el-form>
          </template>

        </button-search>

        <!-- 商品列表 -->
        <!--
         商品
          图片 http://static.yoshop.xany6.com/2018071718294208f086786.jpg
          名称 荣耀 V10全网通 标配版 4GB+64GB 魅丽红
          时间	 2019-07-17 18:34:14
           分类  手机
         商品类型（普通商品）
         实际销量（20）
         商品排序（100）
         商品状态（上架）
         总库存（200）
         价格(元)（1000.00）
         -->
        <el-table border class="mt-3" :data="tableData[tabI].list" style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column
              type="selection"
              width="45">
          </el-table-column>
          <el-table-column label="商品信息" width="350">
            <template slot-scope="scope">
              <div class="d-flex">
                <div style="flex:1">
                  <p class="mb-1">订单编号</p>
                  <p class="mb-1">2018080298545157</p>
                </div>
                <div style="flex:1">
                  <p class="mb-1">下单时间</p>
                  <p class="mb-1">2018080298545157</p>
                </div>
              </div>
              <div class="media">
                <img :src="scope.row.cover" class="mr-3" style="width: 60px;height:60px">
                <div class="media-body">
                  <p class="mb-0">
                    <a class="text-primary">{{ scope.row.title }}</a>
                  </p>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column width="120" align="center" label="实付款">
            <template slot-scope="scope">
              <span>￥20</span>
              <p><small>(含运费：￥0.00)</small></p>
            </template>
          </el-table-column>

          <el-table-column width="120" align="center" label="买家">
            <template slot-scope="scope">
              <span>用户名</span>
              <p><small>(用户id：11)</small></p>
            </template>
          </el-table-column>

          <el-table-column align="center" label="支付方式">
            <template slot-scope="scope">
              <span class="badge badge-success">微信支付</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="配送方式">
            <template slot-scope="scope">
              申通快递
            </template>
          </el-table-column>

          <el-table-column width="170" align="center" label="交易状态">
            <template>
              <div>付款状态:
                <span class="badge badge-success">已付款</span>
              </div>
              <div>发货状态:
                <span class="badge badge-success">待发货</span>
              </div>
              <div>收货状态:
                <span class="badge badge-success">待收货</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column width="150" align="center" label="操作">
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" plain>订单详情</el-button>
              </el-button-group>
            </template>
          </el-table-column>

        </el-table>

        <div style="height: 60px"></div>
        <el-footer class="d-flex align-items-center border-top px-0 position-fixed bg-white"
                   style="left: 200px;bottom:0;right: 0;z-index: 100">
          <el-pagination
              :current-page="tableData[tabIndex].currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
          </el-pagination>
        </el-footer>

      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import ButtonSearch from "@/components/common/button-search";

export default {
  name: "list",
  components:{
    ButtonSearch
  },
  data() {
    return {
      tabIndex: 0,
      tabbars: [
        {name: '全部'},
        {name: '待付款'},
        {name: '待罚款'},
        {name: '已发货'},
        {name: '已收获'},
        {name: '已完成'},
        {name: '已关闭'},
        {name: '退款中'},
      ],

      form: {
        type: "",
        code: "",
        time: "",
        username: "",
        phone: ""
      },

      tableData: [],
      multipleSelection: []
    }
  },
  created() {
    this.__getData()
  },
  methods: {

    __getData() {
      for (let i = 0; i < this.tabbars.length; i++) {
        this.tableData.push({
          currentPage: 1,
          list: []
        })
        for (let j = 0; j < 20; j++) {
          this.tableData[i].list.push({
            id: 1,
            title: '荣耀 V10全网通 标配版 4GB+64GB 魅丽红 ' + i + '-' + j,
            cover: 'http://static.yoshop.xany6.com/2018071718294208f086786.jpg',
            create_time: '2019-07-17 18:34:14',
            category: "手机",
            type: "普通商品",
            sale_count: 20,
            order: 100,
            status: 1,
            stock: 200,
            pprice: 1000,
            ischeck: 1
            // 0未审核，1通过，2不通过
          })
        }
      }
    },

    // 搜索事件
    searchEvent(e = false) {
      if (typeof e === 'string') {
        return console.log('简单搜索')
      }
      console.log('高级搜索')
    },

    // 清空筛选条件
    clearSearch() {
      this.form = {
        type: "",
        code: "",
        time: "",
        username: "",
        phone: ""
      }
      this.$refs.buttonSearch[this.tabIndex].closeSuperSearch()
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>

<style scoped>

</style>