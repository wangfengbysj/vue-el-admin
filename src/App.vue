<template>
  <div id="app">
    <router-view/>

    <el-dialog
        title="提示"
        :visible.sync="imageModel">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="hide">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {},
  // 依赖注入
  provide() {
    return {
      'app':this
    }
  },
  data() {
    return {
      imageModel: false,
      callback: false
    };
  },
  methods: {
    chooseImage(callback) {
      this.callback = callback
      this.imageModel = true
    },
    confirm() {
      // 选中的图片url
      if (typeof this.callback == 'function') {
        this.callback('选中的图片url')
      }
      this.hide()
    },
    hide() {
      this.imageModel = false
      this.callback = false
    }
  }
}
</script>

<style>
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, .1);
  border-radius: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, .25);
  transition: color .2s ease;
}
</style>
