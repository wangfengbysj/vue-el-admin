<template>
  <div class="bg-white px-3" style="margin:-20px;margin-top:-1rem;margin-bottom: 1rem">
    <button-search class="pt-3" ref="buttonSearch" placeholder="要搜索的商品名称">

      <template #left>
        <el-button type="success" size="mini" @click="openModel(false)">添加会员</el-button>
      </template>

      <template #form>
        <el-form :inline="true" :model="search" label-width="80px" class="my-1 p-0">
          <el-form-item label="搜索内容" class="my-1 p-0">
            <el-input v-model="search.keyword" placeholder="手机号/邮箱/会员昵称" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="会员等级" class="my-1 p-0">
            <el-select v-model="search.group_id" placeholder="请选择会员等级" size="mini">
              <el-option label="普通会员" value="shanghai"></el-option>
              <el-option label="黄金会员" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间" class="my-1 py-0">
            <el-date-picker
                v-model="search.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="my-1 px-2">
            <el-button type="info" @click="searchEvent" size="mini">搜索</el-button>
            <el-button @click="clearSearch" size="mini">清空筛选条件</el-button>
          </el-form-item>
        </el-form>
      </template>

    </button-search>

    <el-table border class="mt-3" :data="tableData" style="width: 100%">

      <el-table-column
          width="280"
          label="会员">
        <template slot-scope="scope">
          <div class="media">
            <img :src="scope.row.avatar" class="mr-3 rounded-circle" style="width: 40px;height: 40px">
            <div class="media-body">
              <h6 class="mt-0 d-flex align-items-center">
                {{ scope.row.username }}
                <el-button class="ml-auto" size="mini" type="text">详情</el-button>
              </h6>
              用户ID：{{ scope.row.id }}
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="会员等级">
        <template slot-scope="scope">
          {{ scope.row.level.name }}
        </template>
      </el-table-column>

      <el-table-column width="250" align="center" label="登录注册">
        <template slot-scope="scope">
          <div>注册时间 : {{ scope.row.create_time }}</div>
          <div>最后登录 : {{ scope.row.update_time }}</div>
        </template>
      </el-table-column>

      <el-table-column prop="status" align="center" label="状态" width="120">
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
          <el-button type="text" size="mini" @click="">重置密码</el-button>
          <el-button type="text" size="mini" @click="deleteItem(scope)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog
        title="添加会员"
        :visible.sync="createModal"
        top="5vh">
      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="用户名" style="width: 25%" size="mini"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input show-password v-model="form.password" :min="0" style="width: 25%" placeholder="密码" size="mini"/>
        </el-form-item>

        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="昵称" style="width: 25%" size="mini"></el-input>
        </el-form-item>

        <el-form-item label="头像">
          <div>
            <span v-if="!form.avatar" class="btn btn-light border" @click="chooseImage">
          <i class="el-icon-plus"></i>
        </span>
            <img v-else :src="form.avatar" style="width: 45px;height: 45px; cursor: pointer;" class="rounded"
                 @click="chooseImage"/>
          </div>
        </el-form-item>

        <el-form-item label="会员等级">
          <el-select placeholder="请选择会员等级" v-model="form.level_id">
            <el-option label="普通会员" :value="1"></el-option>
            <el-option label="黄金会员" :value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone" placeholder="手机" style="width: 25%" size="mini"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="邮箱" style="width: 25%" size="mini"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="form.sex" size="mini">
            <el-radio :label="0" border class="mr-0">保密</el-radio>
            <el-radio :label="1" border class="mr-0">男生</el-radio>
            <el-radio :label="2" border>女生</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="状态">
          <el-radio-group v-model="form.status" size="mini">
            <el-radio :label="1" border class="mr-0">启用</el-radio>
            <el-radio :label="0" border>禁用</el-radio>
          </el-radio-group>
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
  inject: ['app'],
  components: {
    buttonSearch
  },
  data() {
    return {
      tableData: [
        {
          id: 10,
          username: "用户名",
          avatar: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=27&gp=0.jpg",
          level_id: 1,
          level: {
            id: 1,
            name: '普通会员'
          },
          create_time: "2019-07-24 15:52:56",
          update_time: "2019-07-24 15:52:56",
          status: 1,//启用
        }
      ],
      search: {
        keyword: "",
        group_id: 0,
        time: ""
      },
      form: {
        username: '',
        password: '',
        nickname: '',
        avatar: '',
        status: 1,
        level_id: 1,
        email: "",
        phone: "",
        sex: 0
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
        this.form.level={
          id:1,
          name:'普通会员'
        },
        this.tableData.unshift(this.form)
      } else {
        let item = this.tableData[this.editIndex]
        item.username = this.form.username
        item.password = this.form.password
        item.status = this.form.status
        item.nickname = this.form.nickname
        item.avatar = this.form.avatar
        item.level_id = this.form.level_id
        item.phone = this.form.phone
        item.email = this.form.email
        item.sex = this.form.sex
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
          username: '',
          password: '',
          nickname: '',
          avatar: '',
          status: 1,
          level_id: 1,
          email: "",
          phone: "",
          sex: 0
        }
        this.editIndex = -1
      } else {
        let row = e.row
        this.editIndex = e.$index
        this.form = {
          username: row.username,
          password: row.password,
          nickname: row.nickname,
          avatar: row.avatar,
          status: row.status,
          level_id: row.level_id,
          email: row.email,
          phone: row.phone,
          sex: row.sex
        }
      }
      this.createModal = true
    },

    // 清空筛选条件
    clearSearch() {
      this.search = {
        keyword: "",
        group_id: "",
        time: "",
      }
      this.$refs.buttonSearch.closeSuperSearch()
    },

    // 搜索事件
    searchEvent(e = false) {
      // 简单搜索
      if (typeof e === 'string') {
        return console.log('简单搜索', e);
      }
      // 高级搜索
      console.log('搜索事件');
    },

    chooseImage() {
      this.app.chooseImage((res) => {
        console.log(res[0].url)
        this.form.avatar = res[0].url
      }, 1)
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