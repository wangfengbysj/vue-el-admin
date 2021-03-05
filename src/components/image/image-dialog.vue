<template>
  <el-dialog title="提示" :visible.sync="imageModel" width="80%" top="5vh">

    <el-container style="position: relative; margin: -30px -20px; height: 70vh ">

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
              <!--                <el-dropdown class="ml-auto">-->
              <span class="btn btn-light btn-sm border ml-auto">
                  {{ item.num }}
                <!--                 <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                </span>
              <!--                  <el-dropdown-menu slot="dropdown">-->
              <!--                    <el-dropdown-item @click.stop.native="openAlbumModel({item,index})">修改</el-dropdown-item>-->
              <!--                    <el-dropdown-item @click.stop.native="albumDel(index)">删除</el-dropdown-item>-->
              <!--                  </el-dropdown-menu>-->
              <!--                </el-dropdown>-->
            </li>
          </ul>
        </el-aside>

        <el-container style="position: absolute;top: 60px;left: 200px;bottom: 60px;right: 0">
          <el-main>
            <!-- 主内容 -->
            <el-row :gutter="10">
              <el-col :span="24" :sm="8" :md="6" :lg="4" v-for="(item,index) in imageList" :key="index">
                <el-card class="box-card mb-3 position-relative"
                         :body-style="{'padding':'0'}"
                         shadow="hover">
                  <div class="border" :class="{'border-danger':item.isCheck}">

                    <span class="badge badge-danger" style="position: absolute;top:0;right:0;" v-if="item.isCheck">
                      {{ item.checkOrder }}
                    </span>

                    <img :src="item.url"
                         class="w-100"
                         style="height: 130px"
                         @click="choose(item)">
                    <div class="w-100 text-white px-2"
                         style="background: rgba(0,0,0,0.5);margin-top: -19px; position: absolute">
                      <span class="small">{{ item.name }}</span>
                    </div>
                    <div class="p-2 text-center">
                      <el-button-group>
                        <el-button size="mini" icon="el-icon-edit" @click="imageEdit(item,index)"></el-button>
                        <el-button size="mini" icon="el-icon-delete" @click="imageDel({index})"></el-button>
                      </el-button-group>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>

      </el-container>
      <el-footer class="d-flex border-top align-items-center px-0">
        <div style="width: 200px;flex-shrink: 0"
             class="h-100 d-flex align-items-center border-right  justify-content-center">
          <el-button-group>
            <el-button size="mini" icon="el-icon-arrow-left">上一页</el-button>
            <el-button size="mini">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </el-button-group>
        </div>
        <div style="flex:1" class="px-2">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
          </el-pagination>
        </div>
      </el-footer>
    </el-container>

    <span slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
  name: "image-dialog",
  props: {
    max: {
      type: Number,
      default: 9
    }
  },
  data() {
    return {
      imageModel: false,
      callback: false,
      searchForm: {
        order: "",
        keyword: ""
      },
      albumIndex: 0,
      albums: [],
      imageList: [],
      // 选中的数组
      chooseList: [],
      currentPage: 1
    }
  },
  created() {
    this.__init()
  },
  methods: {
    // 打开弹出层
    chooseImage(callback) {
      // 取消选中
      this.unChoose()
      this.callback = callback
      this.imageModel = true
    },
    // 确定
    confirm() {
      // 选中的图片url
      if (typeof this.callback == 'function') {
        this.callback(this.chooseList)
      }
      this.hide()
    },
    hide() {
      this.imageModel = false
      this.callback = false
    },
    __init() {
      for (var i = 0; i < 20; i++) {
        this.albums.push({
          name: "相册" + i,
          num: Math.floor(Math.random() * 100),
          order: 0
        })
      }

      for (var i = 0; i < 30; i++) {
        this.imageList.push({
          id: i,
          url: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg",
          name: "图片" + i,
          isCheck: false,
          checkOrder: 0
        })
      }
    },
    //选中图片
    choose(item) {
      // 选中
      if (!item.isCheck) {

        if (this.chooseList.length >= this.max) {
          return this.$message({
            message: `最多选择${this.max}张图片`,
            type: "warning"
          })
        }

        // 加入选中
        this.chooseList.push({id: item.id, url: item.url})
        // 计算序号
        item.checkOrder = this.chooseList.length
        // 修改状态
        item.isCheck = true
        return
      }
      // 取消选中
      // 找到在chooseList中的索引，
      let i = this.chooseList.findIndex(v => v.id === item.id)
      if (i === -1) return;
      let length = this.chooseList.length;
      if (i + 1 < length) {
        for (let j = i; j < length; j++) {
          let no = this.imageList.findIndex(v => v.id === this.chooseList[j].id)
          if (no > -1) {
            this.imageList[no].checkOrder--
          }
        }
      }
      this.chooseList.splice(i, 1)
      item.isCheck = false
      item.checkOrder = 0

    },
    // 取消选中
    unChoose() {
      this.imageList.forEach(img => {
        let i = this.chooseList.findIndex(item => item.id === img.id)
        if (i > -1) {
          img.isCheck = false
          img.checkOrder = 0
          this.chooseList.splice(i, 1)
        }
      })
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 切换相册
    albumChange(index) {
      this.albumIndex = index
    },
    //编辑图片
    imageEdit(item, index) {
      this.$prompt('请输入新名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: item.name,
        inputValidator(val) {
          if (val === '') {
            return "图片名称不能为空"
          }
        }
      }).then(({value}) => {
        item.name = value
        this.$message({
          type: 'success',
          message: '修改成功'
        });
      })
    },

    //删除图片
    imageDel(obj) {
      this.$confirm(obj.all ? "是否删除选中图片?" : '是否删除该图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        if (obj.all) {
          let list = this.imageList.filter(img => {
            return !this.chooseList.some(v => v.id === img.id)
          })
          this.imageList = list
          this.chooseList = []
        } else {
          this.imageList.splice(obj.index, 1)
        }

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

.sum-active {
  color: #67C23A !important;
  background-color: #f0f9eb !important;
  border-color: #c2e7b0 !important;
}
</style>