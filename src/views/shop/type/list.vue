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

      <el-table-column
          prop="name"
          align="center"
          label="类型名称">
      </el-table-column>

      <el-table-column
          align="center"
          label="属性标签">
        <template slot-scope="scope">
          {{ scope.row.value_list|formatValue }}
        </template>
      </el-table-column>

      <el-table-column
          prop="order"
          align="center"
          label="排序">
      </el-table-column>

      <el-table-column
          prop="status"
          align="center"
          label="商品状态"
          width="120">
        <template slot-scope="scope">
          <el-button
              :type="scope.row.status? 'success':'danger'"
              size="mini"
              @click="changeStatus(scope.row)">
            {{ scope.row.status ? '启用' : '禁用' }}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
          prop="id"
          align="center"
          label="操作"
          width="150">
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
        title="添加类型"
        :visible.sync="createModal"
        top="5vh"
        width="80%">

      <el-form ref="typeForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="类型名称" prop="name">
          <el-input v-model="form.name" placeholder="类型名称" style="width: 25%" size="mini"></el-input>
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

        <el-form-item label="关联规格">
          <div class="d-flex">
            <span class="sku-list-item px-3 py-2 border rounded mr-3"
                  style="line-height: initial">
              <font>颜色</font>
              <i class="el-icon-delete"></i>
            </span>
            <el-button size="mini">
              <i class="el-icon-plus"></i>
            </el-button>
          </div>
        </el-form-item>

        <el-form-item label="属性列表">
          <el-table
              :data="value_list"
              style="width: 100%">

            <el-table-column
                prop="order"
                label="排序"
                width="60">
              <template slot-scope="scope">
                <el-input v-model="scope.row.order" size="mini"/>
              </template>
            </el-table-column>

            <el-table-column
                prop="name"
                label="属性名称"
                width="130">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" size="mini"/>
              </template>
            </el-table-column>

            <el-table-column
                prop="type"
                label="所属类型"
                width="130">
              <template slot-scope="scope">
                <el-select v-model="scope.row.type" placeholder="请选择所属类型" size="mini">
                  <el-option value="input" label="输入值"></el-option>
                  <el-option value="radio" label="单选值"></el-option>
                  <el-option value="checkbox" label="多选值"></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column
                prop="status"
                label="是否显示"
                width="80">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"/>
              </template>
            </el-table-column>

            <el-table-column
                label="属性值">
              <template slot-scope="scope" v-if="scope.row.type !== 'input'">
                <el-input type="textarea" v-model="scope.row.value"
                          size="mini" placeholder="一行为一个属性值，多个属性值用换行输入" v-if="scope.row.isedit"></el-input>
                <span v-else>{{ scope.row.value }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="130">
              <template slot-scope="scope">
                <el-button
                    v-if="scope.row.type !== 'input'"
                    type="text"
                    size="mini"
                    @click="editRow(scope)">
                  {{ scope.row.isedit ? '完成' : '编辑属性值' }}
                </el-button>
                <el-button type="text" size="mini" @click="deleteRow(scope.$index)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="text" size="mini" icon="el-icon-plus" @click="addValue">添加一个属性</el-button>
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
          name: "鞋子",
          order: 50,
          status: 1,
          sku_list: [
            {id: 1, name: '颜色'},
            {id: 2, name: '尺寸'}
          ],
          value_list: [
            {
              order: 50,
              name: '特性',
              type: 'input',
              value: "",
              isedit:false
            },
            {
              order: 50,
              name: '前置摄象机',
              type: 'input',
              value: "",
              isedit:false
            }
          ]
        }
      ],
      editIndex: -1,
      currentPage: 1,
      multipleSelection: [],
      createModal: false,

      form: {
        name: '',
        order: 50,
        status: 1,
        sku_list: []
      },

      value_list: [{
        order: 50,
        name: '属性名称',
        type: "input",
        value: "属性值",
        isedit: false
      }],

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
  filters: {
    formatValue(value) {
      let arr = value.map(v => v.name)
      return arr.join(',')
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
          name: "",
          order: 50,
          status: 1,
          sku_list: []
        }
        this.value_list = []
        this.editIndex = -1
      } else {
        this.form = {
          ...e.row
        }
        this.value_list = [...e.row.value_list]
        this.editIndex = e.$index
      }
      // 打开dialog
      this.createModal = true
    },
    // 添加规格
    submit() {
      this.$refs.typeForm.validate(res => {

        //验证属性列表
        var result = true
        var message = []
        this.value_list.forEach((item, index) => {
          let no = index + 1
          if (item.order == '') {
            result = result && false
            message.push('第' + no + '行：排序不能为空')
          }
          if (item.name == '') {
            result = result && false
            message.push('第' + no + '行：属性名称不能为空')
          }
          if (item.type !== 'input' && item.value == '') {
            result = result && false
            message.push('第' + no + '行：属性值不能为空')
          }
        })
        if (!result) {
          var temp = ''
          message.forEach(v => {
            temp += `<li>${v}</li>`
          })
          return this.$notify({
            title: '属性列表提示',
            dangerouslyUseHTMLString: true,
            type: 'warning',
            duration: 3000,
            message: `<ul>${temp}</ul>`
          })
        }

        if (res) {
          var msg = "添加"
          if (this.editIndex === -1) {
            this.tableData.unshift({
              ...this.form,
              value_list: [...this.value_list]
            })
          } else {
            let item = this.tableData[this.editIndex]
            item.name = this.form.name
            item.sku_list = this.form.sku_list
            item.status = this.form.status
            item.type = this.form.type
            item.order = this.form.order
            item.value_list = this.value_list
            msg = "修改"
          }
          // 关闭模态框
          this.createModal = false
          this.$message({
            message: msg + '成功',
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
          type: 'success',
          message: '删除成功!'
        });
      })
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

    //编辑属性
    editRow(scope) {
      scope.row.isedit = !scope.row.isedit
    },

    //添加商品属性
    addValue() {
      this.value_list.push({
        order: 1,
        name: '',
        type: "input",
        value: "",
        isedit: false
      })
    },

    //// 删除属性值
    deleteRow(index) {
      this.value_list.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.sku-list-item > i {
  display: none;
  cursor: pointer;
}

.sku-list-item:hover {
  background-color: #f4f4f4;
}

.sku-list-item:hover > font {
  display: none;
}

.sku-list-item:hover > i {
  display: inline-block;
}
</style>