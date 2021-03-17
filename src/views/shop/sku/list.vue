<template>
  <div class="bg-white px-3" style="margin:-20px;margin-top:-1rem;margin-bottom: 1rem">
    <button-search class="pt-3" ref="buttonSearch" :show-search="false">

      <template #left>
        <el-button size="mini" type="success" @click="openModel(false)">添加规格</el-button>
        <el-button size="mini" type="danger" @click="deleteAll">批量删除</el-button>
      </template>

    </button-search>

    <el-table border class="mt-3" :data="tableData" style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="45">
      </el-table-column>
      <el-table-column prop="name" align="center" label="规格名称"></el-table-column>
      <el-table-column prop="value" align="center" label="规格值"></el-table-column>
      <el-table-column prop="order" align="center" label="排序"></el-table-column>
      <el-table-column prop="status" align="center" label="商品状态" width="120">
        <template slot-scope="scope">
          <el-button
              :type="scope.row.status? 'success':'danger'"
              size="mini"
              @click="changeStatus(scope.row)">
            {{ scope.row.status ? '启用' : '禁用' }}
          </el-button>

        </template>
      </el-table-column>
      <el-table-column prop="id" align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" plain @click="openModel(scope)">修改</el-button>
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

    <el-dialog
        title="添加规格"
        :visible.sync="createModal"
        top="5vh">
      <el-form ref="skuForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="规格名称" prop="name">
          <el-input v-model="form.name" placeholder="规格名称" style="width: 25%" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.order" :min="0" size="mini"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status" size="mini">
            <el-radio :label="1" border class="mr-0">启用</el-radio>
            <el-radio :label="0" border>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.type" size="mini">
            <el-radio :label="0" border class="mr-0">文字</el-radio>
            <el-radio :label="1" border class="mr-0">颜色</el-radio>
            <el-radio :label="2" border>图片</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="规格值" prop="value">
          <el-input
              type="textarea"
              :rows="3"
              placeholder="一行为一个规格项，多个规格项用换行输入"
              v-model="form.value"
              size="mini"/>
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
          name: "颜色1",
          value: "棕色,蓝色",
          order: 50,
          status: 1,
          type: 0
        }, {
          id: 2,
          name: "颜色2",
          value: "棕色,蓝色",
          order: 50,
          status: 1,
          type: 0
        }, {
          id: 3,
          name: "颜色3",
          value: "棕色,蓝色",
          order: 50,
          status: 1,
          type: 0
        }, {
          id: 4,
          name: "颜色4",
          value: "棕色,蓝色",
          order: 50,
          status: 1,
          type: 0
        }, {
          id: 5,
          name: "颜色5",
          value: "棕色,蓝色",
          order: 50,
          status: 1,
          type: 0
        }
      ],
      form: {
        name: '',
        value: '',
        order: 50,
        type: 0,
        status: 1
      },
      editIndex: -1,
      multipleSelection: [],
      currentPage: 1,
      createModal: false,
      rules: {
        name: [
          {
            required: true,
            message: '规格名称不能为空',
            trigger: 'blur'
          }
        ],
        value: [
          {
            required: true,
            message: '规格值不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
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

    //打开对话框
    openModel(e = false) {

      if (!e) {
        this.form = {
          name: '',
          value: '',
          order: 50,
          type: 0,
          status: 1
        }
        this.editIndex = -1
      } else {
        let row = e.row
        this.editIndex = e.$index
        this.form = {
          name: row.name,
          value: row.value.replace(/,/g, '\n'),
          order: row.order,
          type: row.type,
          status: row.status
        }
      }
      this.createModal = true
      this.$refs.skuForm.resetFields();
    },

    // 添加规格
    submit() {
      this.$refs.skuForm.validate(res => {
        if (res) {
          let msg = '添加'
          this.form.value = this.form.value.replace(/\n/g, ',')
          if (this.editIndex === -1) {
            this.tableData.unshift(this.form)

          } else {
            msg = '修改'
            let item = this.tableData[this.editIndex]
            console.log(item)
            item.name = this.form.name
            item.value = this.form.value
            item.order = this.form.order
            item.type = this.form.type
            item.status = this.form.status
            console.log(item)
          }
          this.createModal = false
          this.$message({
            message: `${msg}成功`,
            type: 'success'
          });
        }
      })
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
          message: '删除成功',
          type: 'success'
        });
      })
    },


    //批量删除
    deleteAll() {
      console.log(this.multipleSelection)

      this.$confirm('是否要删除选中规格?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.multipleSelection.forEach(item => {
          let idx = this.tableData.findIndex(v => v.id === item.id)
          if (idx != -1) {
            this.tableData.splice(idx, 1)
          }
        })
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      })
    }
  }
}
</script>

<style scoped>

</style>