<template>
  <div class="bg-white px-3" style="margin:-20px;margin-top:-1rem;margin-bottom: 1rem">

    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane v-for="(tab,tabI) in tabbars" :label="tab.name" :key="tabI">

        <button-search @search="searchEvent" ref="buttonSearch" placeholder="要搜索的商品名称">

          <template #left>
            <router-link class="btn" :to="{name:'shop_goods_create'}">
              <el-button type="success">发布商品</el-button>
            </router-link>
            <el-button type="warning">恢复商品</el-button>
            <el-button type="danger">批量删除</el-button>
            <el-button>上架</el-button>
            <el-button>下架</el-button>
            <el-button>推荐</el-button>
          </template>

          <template #form>
            <el-form :inline="true" :model="form" label-width="80px" class="my-1 p-0">
              <el-form-item label="商品名称" class="my-1 p-0">
                <el-input v-model="form.name" placeholder="商品名称"></el-input>
              </el-form-item>
              <el-form-item label="商品编码" class="my-1 p-0">
                <el-input v-model="form.code" placeholder="商品编码"></el-input>
              </el-form-item>
              <el-form-item label="商品类型" class="my-1 p-0">
                <el-select v-model="form.type" placeholder="请选择商品类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品分类" class="my-1 py-0">
                <el-input v-model="form.category" placeholder="商品编码"></el-input>
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
              width="55">
          </el-table-column>
          <el-table-column label="商品" width="390">
            <template slot-scope="scope">
              <div class="media">
                <img :src="scope.row.cover" class="mr-3" style="width: 60px;height:60px">
                <div class="media-body">
                  <p class="mb-0">{{ scope.row.title }}</p>
                  <p class="mb-0">分类：{{ scope.row.category }}</p>
                  <p class="mb-0">时间：{{ scope.row.create_time }}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="type" align="center" label="商品类型"></el-table-column>
          <el-table-column prop="sale_count" align="center" label="实际销量"></el-table-column>
          <el-table-column prop="order" align="center" label="商品排序"></el-table-column>
          <el-table-column prop="status" align="center" label="商品状态" width="120">
            <template slot-scope="scope">
              <el-button type="success" size="mini" plain @click="scope.row.ischeck=1">审核通过</el-button>
              <el-button type="danger" size="mini" plain @click="scope.row.ischeck=2" class="mt-2 ml-0">审核拒绝</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="pprice" align="center" label="价格(元)"></el-table-column>
          <el-table-column prop="id" align="center" label="操作" width="150">
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" plain>修改</el-button>
                <el-button type="danger" size="mini" plain @click="deleteItem(scope.$index)">删除</el-button>
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
  components: {ButtonSearch},
  data() {
    return {
      tabIndex: 0,
      tabbars: [
        {name: '审核中'},
        {name: '出售中'},
        {name: '已下架'},
        {name: '回收站'}
      ],
      form: {
        name: '',
        code: '',
        type: '',
        category: ''
      },
      superSearch: false,
      tableData: []
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

    // 加载数据
    handleClick(tab, event) {
      console.log(this.tabIndex);
    },

    // 清空筛选条件
    clearSearch() {
      this.form = {
        name: '',
        code: '',
        type: '',
        category: ''
      }
      this.$refs.buttonSearch[this.tabIndex].closeSuperSearch()
    },

    // 搜索事件
    searchEvent(e = false) {
      if (typeof e === 'string') {
        return console.log('简单搜索')
      }
      console.log('高级搜索')
    },

    // 删除当前商品
    deleteItem(index) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData[this.tabIndex].list.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>

<style scoped>

</style>