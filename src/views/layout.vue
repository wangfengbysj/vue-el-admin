<template>
  <div>
    <el-container style="position: absolute; top: 0;left: 0;right: 0;bottom: 0;overflow: hidden">
      <el-header class="d-flex align-items-center bg-dark">
        <a class="mr-auto h5 text-light mb-0">{{ this.$conf.logo }}</a>
        <el-menu
            :default-active="navBar.active"
            mode="horizontal"
            @select="handleSelect"
            class="bg-dark text-light"
            background-color="#343a40"
            text-color="#ffff"
            active-text-color="#ffd04b">
          <el-menu-item :index="index|numToString"
                        v-for="(item,index) in navBar.list">{{ item.name }}
          </el-menu-item>
          <el-submenu index="100">
            <template slot="title">
              <el-avatar size="small"
                         src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
              summer
            </template>
            <el-menu-item index="100-1">修改</el-menu-item>
            <el-menu-item index="100-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container style="height: 100%;">
        <!-- 侧边布局 -->
        <el-aside width="200px" style="padding: 0px;">
          <el-menu :default-active="slideMenuActive"
                   @select="slideSelect"
                   background-color="#D5DCE5"
                   style="height: 100%;">
            <el-menu-item :index="index|numToString" :key="index"
                          style="padding-right: 90px; padding-left: 20px"
                          v-for="(item,index) in slideMenus">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主布局 -->
        <el-main class="bg-white" style="padding-bottom: 60px;position: relative">
          <!-- 面包屑导航-->
          <div class="border-bottom mb-3 bg-white" style="padding: 20px; margin: -20px"
               v-if="bran.length > 0">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                  v-for="(item,index) in bran"
                  :to="{ path: item.path }">{{ item.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!--主内容-->
          <router-view></router-view>
          <!-- 回到顶部-->
          <el-backtop target=".el-main"></el-backtop>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import common from '../common/mixins/common'

export default {
  mixins: [common],
  data() {
    return {
      navBar: {
        active: '0',
        list: [
          {
            subActive: '0',//默认子菜单选择项
            name: '首页',
            submenu: [
              {
                icon: 'el-icon-s-home',
                name: '后台首页',
                pathname: 'index'
              },
              {
                icon: 'el-icon-picture',
                name: '相册管理',
                pathname: 'image'
              },
              {
                icon: 'el-icon-s-order',
                name: '商品列表',
                pathname: 'shop_goods_list'
              }
            ]
          },
          {
            subActive: '0',
            name: '商品',
            submenu: [
              {
                icon: 'el-icon-picture',
                name: '商品分类',
                pathname: 'shop_category_list'
              },
              {
                icon: 'el-icon-s-help',
                name: '商品规格',
                pathname: 'shop_sku_list'
              },
              {
                icon: 'el-icon-s-order',
                name: '商品类型',
                pathname: 'shop_type_list'
              },
              {
                icon: 'el-icon-s-comment',
                name: '商品评论',
                pathname: 'shop_comment_list'
              }
            ]
          },
          {
            subActive: '0',
            name: '订单',
            submenu: [
              {
              icon: 'el-icon-s-order',
              name: '订单管理',
              pathname: 'order_order_list'
              },
              {
                icon: 'el-icon-s-claim',
                name: '发票管理',
                pathname: 'order_invoice_list'
              },
              {
                icon: 'el-icon-s-opportunity',
                name: '售后服务',
                pathname: 'order_after-sale_list'
              }
            ]
          },
          {
            subActive: '0',
            name: '会员',
            submenu: [
              {
                icon: 'el-icon-user',
                name: '会员列表',
                pathname: 'user_user-list_list'
              },
              {
                icon: 'el-icon-s-data',
                name: '会员等级',
                pathname: 'user_user-level_list'
              }
            ]
          },
          {
            subActive: '0',
            name: '设置',
            submenu: [
              {
                icon: 'el-icon-setting',
                name: '基础设置',
                pathname: 'set_base'
              },
              {
                icon: 'el-icon-s-promotion',
                name: '物流设置',
                pathname: 'set_express'
              },
              {
                icon: 'el-icon-s-custom',
                name: '管理员管理',
                pathname: 'set_manager'
              },
              {
                icon: 'el-icon-s-finance',
                name: '交易设置',
                pathname: 'set_payment'
              }
            ]
          }
        ]
      },
      bran: []
    }
  },
  created() {
    this.getRouteBran()
  },
  watch: {
    '$route'(to, from) {
      console.log('to=', to)
      console.log('from=', from)
      this.getRouteBran()
    }
  },
  computed: {
    slideMenuActive: {
      get() {
        return this.navBar.list[this.navBar.active].subActive || '0'
      },
      set(val) {
        this.navBar.list[this.navBar.active].subActive = val
      }
    },
    slideMenus() {
      if (!isNaN(this.navBar.active)) {
        return this.navBar.list[this.navBar.active].submenu || []
      }
    }
  },
  methods: {
    handleSelect(key, path) {
      console.log('key=', key)
      this.navBar.active = key
      // 默认选中跳转到当前激活
      this.slideMenuActive = '0'
      if (this.slideMenus.length > 0 && this.slideMenus[this.slideMenuActive].pathname) {
        this.$router.push({
          name: this.slideMenus[this.slideMenuActive].pathname
        })
      }
    },
    slideSelect(key, path) {
      this.slideMenuActive = key
      console.log(this.navBar.list[this.navBar.active].subActive)
      // 跳转到指定页面
      if (this.slideMenus[key].pathname) {
        this.$router.push({
          name: this.slideMenus[key].pathname
        })
      }
    },
    getRouteBran() {
      console.log(this.$route)
      let b = this.$route.matched.filter(n => n.name)
      let arr = []
      b.forEach((v, k) => {
        if (v.name === 'index' || v.name === 'layout') return
        arr.push({
          name: v.name,
          path: v.path,
          title: v.meta.title
        })
      })
      if (arr.length > 0) {
        arr.unshift({name: 'index', path: '/index', title: '后台首页'})
      }
      this.bran = arr

    }
  }
}
</script>

<style>

</style>