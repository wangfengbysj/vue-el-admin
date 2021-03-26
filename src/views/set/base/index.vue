<template>
  <div class="bg-white px-3" style="margin:-20px;margin-top:-1rem;margin-bottom: 1rem">

    <el-tabs v-model="activeName">
      <el-tab-pane label="注册与访问" name="first">
        <el-form :model="form" label-width="160px">
          <el-form-item label="是否允许注册会员">
            <el-radio-group v-model="form.isreg" size="medium">
              <el-radio-button :label="1">是</el-radio-button>
              <el-radio-button :label="0">否</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="注册类型">
            <el-radio-group v-model="form.reg_type" size="medium">
              <el-radio-button label="username">普通注册</el-radio-button>
              <el-radio-button label="phone">手机注册</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="密码长度">
            <el-input type="number" size="medium" style="width: 25%" v-model="form.password_length"
                      placeholder="密码最小长度"/>
          </el-form-item>

          <el-form-item label="强制密码复杂度">
            <el-checkbox-group v-model="form.password_encrypt" size="medium">
              <el-checkbox-button label="0">数字</el-checkbox-button>
              <el-checkbox-button label="1">小写字母</el-checkbox-button>
              <el-checkbox-button label="2">大写字母</el-checkbox-button>
              <el-checkbox-button label="3">符号</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item>
            <el-button size="medium" type="primary">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="上传设置" name="second">
        <el-form :model="form" label-width="160px">
          <el-form-item label="默认上传方式">
            <el-radio-group v-model="form.upload_method" size="medium">
              <el-radio-button label="local">本地存储</el-radio-button>
              <el-radio-button label="qiniu">七牛云</el-radio-button>
              <el-radio-button label="oss">阿里os</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Bucket">
            <el-input size="medium" v-model="form.Bucket" style="width: 25%" placeholder="Bucket"></el-input>
          </el-form-item>

          <el-form-item label="ACCESS_KEY">
            <el-input size="medium" v-model="form.ACCESS_KEY" style="width: 25%" placeholder="ACCESS_KEY"></el-input>
          </el-form-item>

          <el-form-item label="SECRET_KEY">
            <el-input size="medium" v-model="form.SECRET_KEY" style="width: 25%" placeholder="SECRET_KEY"></el-input>
          </el-form-item>

          <el-form-item label="空间域名">
            <el-input size="medium" v-model="form.https" style="width: 25%" placeholder="https"></el-input>
            <small class="text-secondary d-block">请补全http:// 或 https://</small>
          </el-form-item>

          <el-form-item>
            <el-button size="medium" type="primary">保存</el-button>
          </el-form-item>

        </el-form>
      </el-tab-pane>

      <el-tab-pane label="Api安全" name="third">
        <el-form :model="form" label-width="160px">
          <el-form-item label="是否开启API安全">
            <el-radio-group v-model="form.api" size="medium">
              <el-radio-button :label="0">是</el-radio-button>
              <el-radio-button :label="1">否</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="秘钥">
            <el-input size="medium" v-model="form.api_key" style="width: 25%" placeholder="秘钥"></el-input>
            <small class="text-secondary d-block">秘钥设置关系系统中api调用传输签名串的编码规则，以及会员token解析，请慎重设置，注意设置之后对应会员要求重新登录获取token</small>
          </el-form-item>

          <el-form-item>
            <el-button size="medium" type="primary">保存</el-button>
          </el-form-item>
        </el-form>


      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      activeName: "first",
      form: {
        isreg: 1,
        reg_type: "",
        password_length: "",
        password_encrypt: [0],
        upload_method: "local",
        Bucket: "",
        ACCESS_KEY: "",
        SECRET_KEY: "",
        https: "",
        api: 0,
        api_key:""
      }
    }
  }
}
</script>

<style scoped>

</style>