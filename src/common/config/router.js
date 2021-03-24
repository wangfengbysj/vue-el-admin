/**
 * 规则：
 * 一、例如：index/index，shop/index以index结尾的，path和name默认去除index
 * 二、例如：shop/list，默认生成name为shop_list（如果结尾为index，例如shop/index则是shop）
 * 三、填写后不会自动生成
 * **/

const routes = [
    {
        path: '/',
        name: 'layout',
        component: 'layout',
        redirect: {name: 'index'},
        children: [
            {
                // path: '/index',
                // name: 'index',
                // component: () => import('../../views/index/index.vue')
                meta:{title:'后台首页'},
                component: 'index/index'
            },{
                meta:{title:'相册管理'},
                component: 'image/index'
            },
            {
                // name:'shop_goods_list'
                // path:'/shop/goods/list',
                meta:{title:'商品列表'},
                component: 'shop/goods/list'
            },
            {
                meta: {title:'创建商品'},
                component: 'shop/goods/create'
            },
            {
                meta:{title: '分类管理'},
                component: 'shop/category/list'
            },
            {
                meta:{title:"商品规格管理"},
                component: 'shop/sku/list'
            },
            {
                meta:{title:'商品类型管理'},
                component: 'shop/type/list'
            },
            {
                meta:{title:'商品评论'},
                component: 'shop/comment/list'
            },
            {
                meta:{title:'发票管理'},
                component: 'order/invoice/list'
            },
            {
                meta:{title:'售后服务'},
                component: 'order/after-sale/list'
            },
            {
                meta:{title:'订单管理'},
                component: 'order/order/list'
            },
            {
                meta: {title:'会员列表'},
                component: 'user/user-list/list'
            }
        ]
    },
    {
        // path: '/login',
        // name: 'login',
        // component: () => import('../../views/login/index.vue')
        meta:{title:'登录页面'},
        component: 'login/index'
    },
    {
        path: '*',
        redirect: {name: 'index'}
    }
]

// 去除index
function getValue(str) {
    let index = str.lastIndexOf("/")
    let val = str.substring(index+1, str.length)
    if (val === 'index') {
        return str.substring(index, -1)
    }
    return str

}

// 获取路由信息
let getRoutes = function () {
    // 自动生成路由
    createRoute(routes)
    return routes
}

// 自动生成路由
function createRoute(arr) {
    for (let i = 0; i < arr.length; i++) {

        if (!arr[i].component) return

        // 去除index
        let val = getValue(arr[i].component)
        // 生成name
        arr[i].name = arr[i].name || val.replace(/\//g,'_')
        // 生成path
        arr[i].path = arr[i].path || `/${val}`

        let componentFun = import(`../../views/${arr[i].component}.vue`)
        arr[i].component = () => componentFun
        if (arr[i].children && arr[i].children.length > 0) {
            createRoute(arr[i].children)
        }
    }
}


export default getRoutes()