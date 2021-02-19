<template>
  <div class="bg-white px-3" style="margin:-20px;margin-top:-1rem">

    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane v-for="(tab,tabI) in tabbars" :label="tab.name" :key="tabI">

        <div class="d-flex align-items-center">
          <!--左边-->
          <el-button type="success">发布商品</el-button>
          <el-button type="danger">批量删除</el-button>
          <!--右边-->
          <div class="ml-auto" v-show="!superSearch">
            <el-input v-model="form.name" placeholder="要搜索的商品名称" style="width: 150px"
                      class="mr-2"></el-input>
            <el-button type="info">搜索</el-button>
            <el-button @click="superSearch=true">高级搜索</el-button>
          </div>

        </div>

        <el-card class="box-card my-3 bg-light" :body-style="{'padding':0}" v-show="superSearch">
          <div slot="header" class="clearfix" style="margin:-10px">
            <span>高级搜索</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="superSearch=false">收起</el-button>
          </div>
          <!--表单-->
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
        </el-card>


      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
export default {
  name: "list",
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
      superSearch: false
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(this.tabIndex);
    },
    clearSearch() {
      this.form = {
        name: '',
        code: '',
        type: '',
        category: ''
      }
    },
    searchEvent() {
      console.log('搜索事件')
    }
  }
}
</script>

<style scoped>

</style>