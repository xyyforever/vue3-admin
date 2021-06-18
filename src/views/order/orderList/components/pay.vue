<template>
  <div class="pay">
    <order-info :order-info="orderInfo"/>
    <div class="mb20">
      <div class="el-descriptions__title">支付信息</div>
      <el-table
          :data="tableData"
          style="width: 100%"
          stripe
      >
        <el-table-column prop="merchantNo" label="银行流水号" align="center"></el-table-column>
        <el-table-column prop="merchantName" label="银行" align="center"></el-table-column>
        <el-table-column prop="merchantName" label="打款账号" align="center"></el-table-column>
        <el-table-column prop="merchantName" label="打款户名" align="center"></el-table-column>
        <el-table-column prop="merchantName" label="打款金额" align="center"></el-table-column>
        <el-table-column prop="merchantName" label="打款时间" align="center"></el-table-column>
        <el-table-column prop="merchantName" label="匹配状态" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">

import {reactive, toRefs} from "vue";
import OrderInfo from "./orderInfo.vue";

export default {
  name: 'quotation',
  components: {OrderInfo},
  props: {
    orderInfo: {
      type: Object
    },
  },
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
      ],
    })
    return {
      ...toRefs(state)
    }
  },
};
</script>
<style scoped lang="scss">
.pay {
  width: 100%;
  height: 100%;
  padding-left: 20px;
}

.table-button {
  color: #1890ff;

  text {
    margin-right: 8px;
  }
}
</style>