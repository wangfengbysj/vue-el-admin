<template>
  <div class="vh-100 bg-dark">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7 col-sm-9 col-12 margin-auto pt-5">
          <div class="card mt-5 bg-dark border-0">
            <div class="card-header bg-dark border-0">
              <h3 class="text-light text-center mb-0">{{ this.$conf.logo }}</h3>
            </div>
            <div class="card-body">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item prop="username">
                  <el-input type="text" v-model="ruleForm.username" size="medium" placeholder="请输入用户名"
                            autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" v-model="ruleForm.password" size="medium" placeholder="请输入密码"
                            autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="w-100" size="medium" @click="submitForm()">立即登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 提交表单
          this.axios.post('/admin/login', this.ruleForm).then(res => {
            console.log("res", res)
            // 存储到vuex
            // 存储到本地存储
            this.$store.commit('login', res.data.data)

            // 成功提示
            this.$message('登录成功')

            // 跳转后台首页
            this.$router.push({name: "index"})

          }).catch(err => {
            console.log("err", err)
            if (err.response.data && err.response.data.errorCode) {
              this.$message.error(err.response.data.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>