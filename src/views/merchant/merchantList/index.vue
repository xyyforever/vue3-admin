<template>
  <div class="merchantList">
    <div class="fr jsb ac title">
      <div>
        <h1>商户列表</h1>
      </div>
      <div class="mr60">
        <el-button size="medium"  icon="el-icon-plus" @click="edit(1, -1)">创建商户</el-button>
      </div>
    </div>

    <el-table :data="tableData" style="width: 100%" stripe height="500px">
      <el-table-column prop="merchantNo" label="机构ID" align="center" width="100"></el-table-column>
      <el-table-column prop="merchantName" label="机构名称" align="center"></el-table-column>
      <el-table-column prop="addressDetailed" label="所在地" align="center"></el-table-column>
      <el-table-column prop="merchantType" label="机构类型" align="center"></el-table-column>
      <!-- <el-table-column prop="id" label="商户类型"></el-table-column>-->
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" width="340" align="center">
          <el-button size="mini">查看</el-button>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini">添加账号</el-button>
          <el-button size="mini">添加地址</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
        @current-change=""
        :current-page="1"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import {reactive, toRefs} from "vue";

export default {
  name: 'merchantList',
  setup() {
    const state = reactive({
      tableData: [
        {
          merchantNo: 'C102930',
          merchantName: '2016-05-02',
          addressDetailed: '1号实验室',
          merchantType: '1号实验室',
          createTime: '烟感2.1%OBS/M',
        },
        {
          merchantNo: 'C102930',
          merchantName: '2016-05-02',
          addressDetailed: '1号实验室',
          merchantType: '1号实验室',
          createTime: '烟感2.1%OBS/M',
        },
        {
          merchantNo: 'C102930',
          merchantName: '2016-05-02',
          addressDetailed: '1号实验室',
          merchantType: '1号实验室',
          createTime: '烟感2.1%OBS/M',
        },
        {
          merchantNo: 'C102930',
          merchantName: '2016-05-02',
          addressDetailed: '1号实验室',
          merchantType: '1号实验室',
          createTime: '烟感2.1%OBS/M',
        },
        {
          merchantNo: 'C102930',
          merchantName: '2016-05-02',
          addressDetailed: '1号实验室',
          merchantType: '1号实验室',
          createTime: '烟感2.1%OBS/M',
        },
        {
          merchantNo: 'C102930',
          merchantName: '2016-05-02',
          addressDetailed: '1号实验室',
          merchantType: '1号实验室',
          createTime: '烟感2.1%OBS/M',
        },
        {
          merchantNo: 'C102930',
          merchantName: '2016-05-02',
          addressDetailed: '1号实验室',
          merchantType: '1号实验室',
          createTime: '烟感2.1%OBS/M',
        },
        {
          merchantNo: 'C102930',
          merchantName: '2016-05-02',
          addressDetailed: '1号实验室',
          merchantType: '1号实验室',
          createTime: '烟感2.1%OBS/M',
        },
      ]
    })
    return {
      ...toRefs(state)
    }
  },

};
</script>
<style lang="scss" src="./index.scss" scoped></style>
