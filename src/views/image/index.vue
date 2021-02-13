<template>
  <div>
    <el-container style="position: absolute;left: 0;right: 0;bottom: 0;top:55px">

      <el-header class="d-flex align-items-center border-bottom">
        <!-- 头部 -->
        <div class="mr-auto d-flex">
          <el-select size="medium" v-model="searchForm.order" placeholder="请选择活动区域" style="width: 150px" class="mr-2">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-input placeholder="输入相册名字" v-model="searchForm.keyword" size="medium" style="width: 150px"
                    class="mr-2"></el-input>
          <el-button type="success" size="medium">搜索</el-button>
        </div>
        <el-button type="success" size="medium" @click="openAlbumModel(false)">创建相册</el-button>
        <el-button type="warning" size="medium">上传图片</el-button>
      </el-header>

      <el-container>
        <el-aside width="200px" style="position: absolute;top: 60px;left: 0;bottom: 60px;">
          <!-- 侧边 -->
          <ul class="list-group list-group-flush">
            <li class="list-group-item list-group-item-action d-flex align-items-center"
                :class="{'active sum-active':index===albumIndex}"
                @click.stop="albumChange(index)"
                v-for="(item,index) in albums" :key="index">
              {{ item.name }}
              <el-dropdown class="ml-auto">
                <span class="btn btn-light btn-sm border">
                  {{ item.num }}
                 <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.stop.native="openAlbumModel({item,index})">修改</el-dropdown-item>
                  <el-dropdown-item @click.stop.native="albumDel(index)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </el-aside>

        <el-container style="position: absolute;top: 60px;left: 200px;bottom: 60px;right: 0">
          <el-main>
            <!-- 主内容 -->
          </el-main>
        </el-container>

      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>

    <!-- 修改对话框-->
    <el-dialog
        title="修改相册"
        :visible.sync="albumModel">
      <el-form ref="form" :model="albumForm" label-width="80px">
        <el-form-item label="相册名称">
          <el-input v-model="albumForm.name" size="medium" placeholder="请输入相册名称"></el-input>
        </el-form-item>
        <el-form-item label="相册排序">
          <el-input-number v-model="albumForm.order" size="medium" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="albumModel = false">取 消</el-button>
        <el-button type="primary" @click="confirmAlbumModel()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      searchForm: {
        order: "",
        keyword: ""
      },
      albumForm: {
        name: "",
        order: 0
      },
      albumEditIndex: -1,
      albumModel: false,
      albumIndex: 0,
      albums: []
    }
  },
  created() {
    this.__init()
  },
  methods: {

    // 点击确定修改/创建相册
    confirmAlbumModel() {
      // 判断是否为修改
      if (this.albumEditIndex > -1) {
        this.albumEdit()
        return this.albumModel = false
      }

      // 追加albums
      this.albums.unshift({
        name:this.albumForm.name,
        order:this.albumForm.order,
        num:0
      })
      this.albumModel = false
    },

    // 修改相册
    albumEdit() {
      this.albums[this.albumEditIndex].name = this.albumForm.name
      this.albums[this.albumEditIndex].order = this.albumForm.order
    },

    // 打开相册修改/创建框
    openAlbumModel(obj) {
      //修改
      if (obj) {
        let {item, index} = obj
        this.albumForm.name = item.name
        this.albumForm.order = item.order
        this.albumEditIndex = index
        return this.albumModel = true
      }

      //创建
      this.albumForm = {
        name: "",
        order: 0
      }
      this.albumEditIndex = -1
      this.albumModel = true
    },

    // 删除相册
    albumDel(index) {
      this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.albums.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
    },

    // 切换相册
    albumChange(index) {
      this.albumIndex = index
    },

    __init() {
      for (var i = 0; i < 20; i++) {
        this.albums.push({
          name: "相册" + i,
          num: Math.floor(Math.random() * 100),
          order: 0
        })
      }
    }
  }
}
</script>

<style scoped>

.sum-active {
  color: #67C23A !important;
  background-color: #f0f9eb !important;
  border-color: #c2e7b0 !important;
}

.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>