<template>
  <div class="bg-white px-3" style="margin:-20px;margin-top:-1rem;margin-bottom: 1rem">
    <button-search class="pt-3" ref="buttonSearch" :show-search="false">

      <template #left>
        <el-button size="mini" type="danger" @click="deleteAll">批量删除</el-button>
      </template>

      <template #form>
        <el-form inline ref="form" :model="form" label-width="80px">
          <el-form-item label="用户评价" class="mb-0">
            <el-input v-model="form.username"
                      placeholder="评价用户"
                      size="mini"></el-input>
          </el-form-item>

          <el-form-item label="评价类型" class="mb-0">
            <el-select v-model="form.type"
                       size="mini"
                       placeholder="评价类型">
              <el-option label="区域一" value="shanghai"/>
              <el-option label="区域二" value="beijing"/>
            </el-select>
          </el-form-item>

          <el-form-item label="发布时间" class="mb-0">
            <el-date-picker v-model="form.time"
                            size="small"
                            type="daterange"
                            range-separate="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="mb-0">
            <el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
            <el-button size="mini" @click="clearSearch">清空筛选条件</el-button>
          </el-form-item>
        </el-form>
      </template>

    </button-search>

    <el-table border class="mt-3" :data="tableData" style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="45">
      </el-table-column>

      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="media">
            <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=27&gp=0.jpg"
                 class="mr-3"
                 alt="Generic placeholder image"
                 style="height: 70px;width: 70px;border-radius: 100%">
            <div class="media-body">
              <h6 class="mt-0 d-flex align-items-center">
                用户名2 <small class="ml-2">2019-07-23 14:15:17</small>
                <el-button class="ml-auto" type="danger" size="mini">删除</el-button>
              </h6>
              评论内容

              <div class="media mt-3">
                <a class="mr-3" href="#">
                  <img
                      src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=27&gp=0.jpg"
                      alt="Generic placeholder image"
                      style="height: 70px;width: 70px;border-radius: 100%">
                </a>
                <div class="media-body">
                  <h5 class="mt-0 d-flex align-items-center">
                    客服一 <small class="ml-2">2019-07-23 14:15:17</small>
                    <el-button class="ml-auto" type="danger" size="mini">删除</el-button>
                  </h5>
                  回复内容
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
          label="ID"
          width="70"
          prop="id"
          align="center">
      </el-table-column>

      <el-table-column
          align="center"
          label="商品"
          width="380">
        <template slot-scope="scope">
          <div class="media">
            <img class="mr-1" style="width: 60px;height: 60px;" :src="scope.row.goods.cover">
            <div class="media-body">
              <p class="mb-0 text-left">{{scope.row.goods.title}}</p>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
          width="250"
          label="评价信息">
        <template slot-scope="scope">
          <div class="d-flex flex-column">
            <p>用户名: {{scope.row.username}}</p>
            <p class="d-flex align-items-center">评分: <el-rate
                v-model="scope.row.star"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
            </el-rate></p>
          </div>
        </template>
      </el-table-column>

      <el-table-column
          prop="create_time"
          align="center"
          label="评价时间">
      </el-table-column>

      <el-table-column
          align="center"
          label="是否显示">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status"></el-switch>
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
      tableData: [
        {
          id: 1,
          goods: {
            title: "商品标题",
            cover: "http://static.yoshop.xany6.com/2018071718294208f086786.jpg"
          },
          username: "用户名",
          star: 5,
          create_time: "2019-07-23 14:15:17",
          status: 1
        }
      ],
      currentPage: 1,
      multipleSelection: [],
      form: {
        username: "",
        type: "",
        time: ""
      }
    }
  },
  methods: {
    clearSearch() {

    },
    searchEvent(e) {
      console.log(e)
    },

    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    //启用禁用
    changeStatus(item) {
      item.status = !item.status
      this.$message({
        message: item.status ? '启用' : '禁用',
        type: 'success'
      });
    },

    //批量删除
    deleteAll() {
      this.$confirm('是否要删除选中规格?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.multipleSelection.forEach(item => {
          let index = this.tableData.findIndex(v => v.id === item.id)
          if (index !== -1) {
            this.tableData.splice(index, 1)
          }
        })
        this.multipleSelection = []

        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
    },
  }
}
</script>

<style scoped>

</style>