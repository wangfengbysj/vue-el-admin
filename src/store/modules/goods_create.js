export default {
    state: {
        skus_type: 0,
        title: "",  //商品名称
        category: [], //商品名称
        desc: "", //商品描述
        unit: "", //商品单位
        stock: 0,  //总库存
        min_stock: 0, //库存预警
        display_stock: 0, //库存显示
        status: 0, //是否上架
        express: "", //运费模板

        oprice: 0, //市场价格
        pprice:0,  //销售价格
        cprice:0,  //成本价格
        weight:0,  //体重
        volume:0,  //体积

        //规格卡片
        sku_card:[
            {
                name:'色调',
                type: 0, // 规格类型：0无 1颜色 2图片
                //规格属性列表
                list:[
                    {
                        name:'蓝色',
                        color:'',
                        image:''
                    },
                    {
                        name:'黄色',
                        color:'',
                        image:''
                    }
                ]
            }
        ]

    },
    getters: {},
    mutations: {
        // 修改state
        vModelState(state, {key, value}) {
            state[key] = value
        }
    },
    actions: {}
}