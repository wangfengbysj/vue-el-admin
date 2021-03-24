<template>
  <div class="bg-white px-3" style="margin:-20px;margin-top:-1rem;margin-bottom: 1rem">
    <button-search class="pt-3">

      <template #left>
        <el-button type="success" size="mini" @click="openModel(false)">添加等级</el-button>
      </template>

      <template #right>
        <div>
          <small class="mr-2">选择升级标准：</small>
          <el-radio-group v-model="level" size="mini">
            <el-radio-button :label="0">累计消费</el-radio-button>
            <el-radio-button :label="1">累计次数</el-radio-button>
          </el-radio-group>
        </div>
      </template>

    </button-search>


    <el-table border class="mt-3" :data="tableData" style="width: 100%">

      <el-table-column
          align="center"
          label="等级名称"
          prop="name">
      </el-table-column>

      <el-table-column
          align="center"
          width="250"
          label="升级条件">
        <template slot-scope="scope">
          {{ getLevel.name + ':' + scope.row[getLevel.value] }}
        </template>
      </el-table-column>

      <el-table-column
          width="250"
          align="center"
          label="折扣率(%)"
          prop="discount">
      </el-table-column>

      <el-table-column
          width="250"
          align="center"
          label="等级序号"
          prop="level">
      </el-table-column>

      <el-table-column prop="status" align="center" label="状态">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="id" align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="openModel(scope)">修改</el-button>
          <el-button type="text" size="mini" @click="deleteItem(scope)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog
        title="添加等级"
        :visible.sync="createModal"
        top="5vh">
      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="等级名称" prop="name">
          <el-input v-model="form.name" placeholder="等级名称" style="width: 25%" size="mini"></el-input>
          <small class="text-secondary d-block">
            设置会员等级名称
          </small>
        </el-form-item>

        <el-form-item label="等级权重">
          <el-input type="number" v-model="form.level" style="width: 25%" placeholder="等级权重" size="mini"/>
          <small class="text-secondary d-block">
            设置会员等级排序(此参数决定等级的高低,排序越大等级越高,请谨慎选择)
          </small>
        </el-form-item>

        <el-form-item label="是否启用">
          <el-radio-group v-model="form.status" size="mini">
            <el-radio :label="1" border>启用</el-radio>
            <el-radio :label="0" border>禁用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="升级条件">
          <div>
            <small class="mr-2">累计消费满</small>
            <el-input type="number" v-model="form.consume" placeholder="累计消费" size="mini" style="width: 25%;">
              <template slot="append">元</template>
            </el-input>
            <small class="text-secondary d-block">
              设置会员等级所需要的累计消费必须大于等于0,单位：元
            </small>
          </div>
          <div>
            <small class="mr-2">累计次数满</small>
            <el-input type="number" v-model="form.times" placeholder="累计次数" size="mini" style="width: 25%;">
              <template slot="append">次</template>
            </el-input>
            <small class="text-secondary d-block">
              设置会员等级所需要的购买量必须大于等于0,单位：笔
            </small>
          </div>
        </el-form-item>
        <el-form-item label="折扣率(%)">
          <el-input size='mini' type="number" v-model="form.discount" placeholder="折扣率" style="width: 25%;">
            <template slot="append">%</template>
          </el-input>
          <small class="text-secondary d-block">
            折扣率单位为百分比，如输入90，表示该会员等级的用户可以以商品原价的90%购买
          </small>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="createModal = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import buttonSearch from "@/components/common/button-search";

export default {
  name: "list",
  components: {
    buttonSearch
  },
  computed: {
    getLevel() {
      let arr = [
        {
          name: '累计消费',
          value: "consume"
        },
        {
          name: '累计次数',
          value: "times"
        }
      ]
      return arr[this.level]
    }
  },
  data() {
    return {
      level: 0,

      tableData: [{
        name: "普通会员",
        consume: 100,
        times: 10,
        discount: 10,
        level: 1,
        status: 1,//启用
        create_time: "",
      }],

      form: {
        name: "",
        consume: 0,
        times: 0,
        discount: 0,
        level: 0,
        status: 1,//启用
      },

      editIndex: -1,
      currentPage: 1,
      createModal: false,
    }
  },
  methods: {

    // 添加规格
    submit() {
      var msg = "添加"
      if (this.editIndex === -1) {
        console.log(this.form)
        this.tableData.unshift(this.form)
      } else {
        let item = this.tableData[this.editIndex]
        item.name = this.form.name
        item.consume = this.form.consume
        item.status = this.form.status
        item.times = this.form.times
        item.discount = this.form.discount
        item.level = this.form.level
        item.status = this.form.status
        msg = "修改"
      }
      // 关闭模态框
      this.createModal = false
      this.$message({
        message: msg + '成功',
        type: 'success'
      });
    },


    //打开对话框
    openModel(e = false) {

      if (!e) {
        this.form = {
          name: "",
          consume: 0,
          times: 0,
          discont: 0,
          level: 0,
          status: 1,
        }
        this.editIndex = -1
      } else {
        let row = e.row
        this.editIndex = e.$index
        this.form = {
          name: row.name,
          consume: row.consume,
          times: row.times,
          discount: row.discount,
          level: row.level,
          status: row.status
        }
      }
      this.createModal = true
    },

    //删除单个
    deleteItem(scope) {
      this.$confirm('是否要删除该会员?', '提示', {
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
    },
  }
}
</script>

<style scoped>

</style>