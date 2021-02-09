<template>
    <div>
        <el-container style="position: absolute; top: 0;left: 0;right: 0;bottom: 0;overflow: hidden">
            <el-header class="d-flex align-items-center bg-dark">
                <a class="mr-auto h5 text-light mb-0">UNI-ADMIN</a>
                <el-menu
                        :default-active="navBar.active"
                        mode="horizontal"
                        @select="handleSelect"
                        class="bg-dark text-light"
                        background-color="#343a40"
                        text-color="#ffff"
                        active-text-color="#ffd04b">
                    <el-menu-item :index="index|numToString"
                                  v-for="(item,index) in navBar.list">{{item.name}}
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
            <el-container style="height: 100%;padding-bottom: 60px;">
                <!-- 侧边布局 -->
                <el-aside width="200px" style="padding: 0px">
                    <el-menu default-active="0"
                             @select="slideSelect"
                             background-color="#D5DCE5"
                    style="height: 100%;">
                        <el-menu-item :index="index|numToString" :key="index" style="padding-right: 90px; padding-left: 20px"
                        v-for="(item,index) in slideMenus">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <!-- 主布局 -->
                <el-main>
                    <li v-for="i in 100" :key="i">{{i}}</li>
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
                                name: '后台首页'
                            },
                            {
                                icon: 'el-icon-picture',
                                name: '相册管理'
                            },
                            {
                                icon: 'el-icon-s-order',
                                name: '商品列表'
                            },
                            {
                                icon: 'el-icon-bangzhu',
                                name: '商品规则'
                            }
                        ]
                    },
                    {
                        subActive: '0',
                        name: '商品',
                        submenu: [
                            {
                                icon: 'el-icon-s-order',
                                name: '商品列表'
                            },
                            {
                                icon: 'el-icon-picture',
                                name: '商品分类'
                            },
                            {
                                icon: 'el-icon-s-order',
                                name: '商品规则'
                            },
                            {
                                icon: 'el-icon-s-order',
                                name: '商品类型'
                            },
                            {
                                icon: 'el-icon-s-comment',
                                name: '商品评论'
                            }
                        ]
                    },
                    {
                        subActive: '0',
                        name: '订单',
                        submenu: [
                            {
                                icon: 'el-icon-s-order',
                                name: '订单列表'
                            },
                            {
                                icon: 'el-icon-s-custom',
                                name: '发票管理'
                            },
                            {
                                icon: 'el-icon-s-opportunity',
                                name: '售后服务'
                            }
                        ]
                    },
                    {
                        subActive: '0',
                        name: '会员',
                        submenu: [
                            {
                                icon: 'el-icon-user',
                                name: '会员列表'
                            },
                            {
                                icon: 'el-icon-s-data',
                                name: '会员等级'
                            }
                        ]
                    },
                    {
                        subActive: '0',
                        name: '设置',
                        submenu: [
                            {
                                icon: 'el-icon-setting',
                                name: '基础设置'
                            },
                            {
                                icon: 'el-icon-s-promotion',
                                name: '物流设置'
                            },
                            {
                                icon: 'el-icon-s-custom',
                                name: '管理员管理'
                            },
                            {
                                icon: 'el-icon-s-finance',
                                name: '交易设置'
                            }
                        ]
                    }
                ]
            }

        }
    },
    computed:{
        slideMenuActive: {
            get(){
                return this.navBar.list[this.navBar.active].subActive || '0'
            },
            set(val){
                this.navBar.list[this.navBar.active].subActive = val
            }
        },
        slideMenus(){
            if (!isNaN(this.navBar.active)){
                return this.navBar.list[this.navBar.active].submenu || []
            }
        }
    },
    methods: {
        handleSelect(key, path) {
            console.log('key=',key)
            this.navBar.active = key
        },
        slideSelect(key,path){
            this.slideMenuActive = key
            console.log(this.navBar.list[this.navBar.active].subActive)
        }
    }
}
</script>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
</style>