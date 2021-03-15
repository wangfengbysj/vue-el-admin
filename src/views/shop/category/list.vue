<template>
  <div class="custom-tree px-3">
    <div class="border-bottom d-flex align-items-center py-1 px-2"
         style="margin: -32px;margin-top: -1rem;margin-bottom: 1rem!important;">
      <el-button type="primary" size="mini" @click="createTop">创建顶级分类</el-button>
    </div>
    <el-tree :data="data"
             :props="defaultProps"
             @node-click="handleNodeClick"
             default-expand-all
             draggable
             @node-drop="nodeDrop"
             :expand-on-click-node="false">
    <span class="custom-tree-node" slot-scope="{ node, data }">
        <div>
          <el-input v-if="data.editStatus" v-model="data.label" size="mini"></el-input>
          <span v-else>{{ node.label }}</span>
        </div>
        <span>
          <el-button :type="data.status? 'primary':'danger'" size="mini" plain @click.stop="showOrHide(node,data)">
            {{ data.status ? '显示' : '隐藏' }}
          </el-button>

          <el-button type="success" size="mini" plain @click="append(data)">增加</el-button>

          <el-button :type="data.editStatus?'default':'warning'" size="mini" plain @click="edit(data)">
            {{ data.editStatus ? '完成' : '修改' }}
          </el-button>

          <el-button type="danger" size="mini" plain @click="remove(node,data)">删除</el-button>
        </span>
    </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      data: [{
        id: 1,
        label: '一级 1',
        status: 1,
        editStatus: false,
        children: [{
          id: 2,
          label: '二级 1-1',
          status: 1,
          editStatus: false,
          children: [{
            id: 3,
            label: '三级 1-1-1',
            status: 1,
            editStatus: false
          }]
        }]
      }, {
        id: 4,
        label: '一级 2',
        status: 1,
        editStatus: false,
        children: [{
          id: 5,
          label: '二级 2-1',
          status: 1,
          editStatus: false,
          children: [{
            id: 6,
            label: '三级 2-1-1',
            status: 1,
            editStatus: false,
          }]
        }, {
          id: 7,
          label: '二级 2-2',
          status: 1,
          editStatus: false,
          children: [{
            id: 8,
            label: '三级 2-2-1',
            status: 1,
            editStatus: false,
          }]
        }]
      }, {
        id: 9,
        label: '一级 3',
        status: 1,
        editStatus: false,
        children: [{
          id: 10,
          label: '二级 3-1',
          status: 1,
          editStatus: false,
          children: [{
            id: 11,
            label: '三级 3-1-1',
            status: 1,
            editStatus: false,
          }]
        }, {
          id: 12,
          label: '二级 3-2',
          status: 1,
          editStatus: false,
          children: [{
            id: 13,
            label: '三级 3-2-1',
            status: 1,
            editStatus: false,
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      // console.log(data);
    },

    //显示或隐藏
    showOrHide(node, data) {
      data.status = data.status ? 0 : 1
      node.expanded = !node.expanded
    },

    //编辑
    edit(data) {
      data.editStatus = !data.editStatus
    },

    //删除
    remove(node, data) {

      console.log(node)
      this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let parent = node.parent
        let children = parent.data.children || parent.data
        const index = children.findIndex(v => {
          return v.id === data.id
        })
        children.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
    },

    //增加
    append(data) {
      let obj = {
        id: 1,
        label: '二级 3-2',
        status: 1,
        editStatus: false,
        children: []
      }
      if (!data.children) {
        data.children = []
      }
      data.children.push(obj)
    },

    //移动
    nodeDrop(...options) {
      console.log(options[0].data)
      console.log(options[1].data)
    },

    //创建顶级分类
    createTop() {
      this.$prompt('请输入顶级分类名称', '提示', {
        confirmButtonText: '创建',
        cancelButtonText: '取消',
        inputValidator:function(val){
          if (val == '' || val == null ){
            return '顶级分类名称不能为空'
          } else{
            return true
          }
        }
      }).then(({ value }) => {
        console.log(value)
      })
    }
  },

}
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.custom-tree >>> .el-tree-node__content {
  padding: 18px 0;
}
</style>