<template>
  <div class="bg-white px-3" style="margin:-20px;margin-top:-1rem;margin-bottom: 1rem">
    <button-search class="pt-3" ref="buttonSearch">

      <template #right>
        <div class="d-flex align-items-center">
          <el-date-picker
              v-model="search.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>

          <el-input v-model="search.keyword" class="mx-2" size="medium" style="width: 200px" placeholder="请输入订单号"/>
          <el-button type="info" size="medium">搜索</el-button>
        </div>
      </template>
    </button-search>

    <el-table border class="mt-3" :data="tableData" style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="45">
      </el-table-column>

      <el-table-column
          prop="name"
          align="center"
          label="订单编号">
      </el-table-column>

      <el-table-column
          prop="username"
          align="center"
          label="用户名">

      </el-table-column>

      <el-table-column
          prop="price"
          align="center"
          label="开票金额">
      </el-table-column>

      <el-table-column
          prop="status"
          align="center"
          label="商品状态">
      </el-table-column>

      <el-table-column
          prop="price"
          align="center"
          label="抬头">
      </el-table-column>

      <el-table-column
          prop="content"
          align="center"
          label="发票内容">
      </el-table-column>

      <el-table-column
          prop="code"
          align="center"
          label="纳税人识别号">
      </el-table-column>

      <el-table-column
          prop="create_time"
          align="center"
          label="创建时间">
      </el-table-column>

      <el-table-column
          prop="id"
          align="center"
          label="操作"
          width="150">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="danger" size="mini" plain @click="deleteItem(scope)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>

    </el-table>

    <!--    <div style="height: 60px"></div>-->
    <el-footer class="d-flex align-items-center border-top px-0 position-fixed bg-white"
               style="left: 200px;bottom:0;right: 0;z-index: 100">
      <el-pagination
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
      </el-pagination>
    </el-footer>

  </div>
</template>

<script>
import buttonSearch from '../../../components/common/button-search'

export default {
  name: "list",
  components: {
    buttonSearch
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      multipleSelection: [],
      search: {
        time: "",
        keyword: ""
      }
    }
  },
  methods: {

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    //删除单个
    deleteItem(scope) {
      this.$confirm('是否要删除该规格?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(scope.$index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
    }
  }
}
</script>

<style scoped>

</style>