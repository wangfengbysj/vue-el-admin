<template>
  <el-dialog title="商品规格选择" :visible.sync="createModel" width="80%" top="5vh">

    <el-container style="position: relative; margin: -30px -20px; height: 70vh ">

      <el-container>
        <el-aside width="200px" style="position: absolute;top: 0px;left: 0;bottom: 0px;" class="bg-white border-right">
          <!-- 侧边 -->
          <ul class="list-group list-group-flush">
            <li class="list-group-item list-group-item-action d-flex align-items-center"
                :class="{'active sum-active':index===skuIndex}"
                v-for="(item,index) in skusList" :key="index"
                @click="changeSku(index)">
              {{ item.name }}
            </li>
          </ul>
        </el-aside>

        <el-container>
          <el-header style="position: absolute;left: 200px;top: 0px;right: 0px;height: 60px;line-height: 60px"
                     class="border-top border-bottom">
            <el-button type="primary" size="mini" @click="doChooseAll">
              {{ isChooseAll ? '取消全选' : '全选' }}
            </el-button>
            <!-- 头部 -->
          </el-header>
          <el-main style="position: absolute;top: 60px;left: 200px;bottom: 0;right: 0">
            <!-- 主内容 -->
            <div class="d-flex flex-wrap">
              <span v-for="(item,index) in skuItems"
                    :key="index"
                    class="border rounded py-1 px-2 m-2"
                    style="cursor: pointer"
                    @click="choose(item)"
              :class="item.ischeck? 'sum-active':'' ">
                {{ item.name }}
              </span>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>

    <span slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
  name: "sku-dialog",
  computed: {
    // 当前规格下的规格属性列表
    skuItems() {
      return this.skusList[this.skuIndex].list
    },
    //是否全选
    isChooseAll() {
      return this.chooseList.length == this.skuItems.length
    }
  },
  data() {
    return {
      createModel: false,
      skuIndex: 0,
      chooseList: [],
      callback: false,
      skusList: [
        {
          name: '色调',
          type: 0, // 规格类型：0无 1颜色 2图片
          //规格属性列表
          list: [
            {
              id: 1,
              name: '蓝色',
              color: '',
              image: '',
              ischeck: false
            },
            {
              id: 2,
              name: '黄色',
              color: '',
              image: '',
              ischeck: false
            }
          ]
        },
        {
          name: '尺寸',
          type: 0, // 规格类型：0无 1颜色 2图片
          //规格属性列表
          list: [
            {
              id: 3,
              name: 'XL',
              color: '',
              image: '',
              ischeck: false
            },
            {
              id: 4,
              name: 'XXL',
              color: '',
              image: '',
              ischeck: false
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 打开弹出层
    chooseSkus(callback) {
      // 取消选中
      this.callback = callback
      this.createModel = true
    },
    // 确定
    confirm() {
      // 选中的图片url
      if (typeof this.callback == 'function') {
        let item = this.skusList[this.skuIndex]
        this.callback({
          name: item.name,
          type: item.type,
          list: this.chooseList
        })
      }
      this.hide()
    },
    hide() {
      this.unChooseAll()
      this.createModel = false
      this.callback = false
    },

    // 切换规格卡片
    changeSku(index) {
      this.unChooseAll()
      this.skuIndex = index
    },

    // 取消选中所有
    unChooseAll(){
      // 取消选中状态
      let list = this.skusList[this.skuIndex].list

      // 取消选中状态
      list.forEach(v => {
        v.ischeck = false
      })

      // 清空选中列表
      return this.chooseList = []

    },

    // 选中规格属性
    choose(item) {
      // 之前没有选中
      if (!item.ischeck) {
        // 加入选中列表
        this.chooseList.push(item)
        // 修改选中状态
        return item.ischeck = true
      }
      // 之前选中
      // 找到当前对象在chooseList中的索引
      let index = this.chooseList.findIndex(v => {
        return v.id == item.id
      })

      // 找不到
      if (index < 0) return
      // 从选中列表中移除
      this.chooseList.splice(index, 1)
      // 修改选中状态
      item.ischeck = false
    },

    // 取消选中所有
    doChooseAll(){
      let list = this.skusList[this.skuIndex].list
      // 已经全选
      if (this.isChooseAll){
        return this.unChooseAll()
      }

      // 全选
      this.chooseList = list.map(v => {
        v.ischeck = true
        return v
      })
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
</style>