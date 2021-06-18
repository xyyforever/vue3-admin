<template>
  <div class="mb20">
    <el-descriptions title="订单信息">
      <el-descriptions-item label="订单编号:">{{orderInfo.orderNo}}</el-descriptions-item>
      <el-descriptions-item label="订单金额:"><span style="color: red">¥{{orderInfo.orderPrice}}</span></el-descriptions-item>
      <el-descriptions-item label="售卖商户:">{{orderInfo.sellerName}}</el-descriptions-item>
      <el-descriptions-item label="客户名称:">{{orderInfo.customerName}}</el-descriptions-item>
      <el-descriptions-item label="联系人:">{{orderInfo.contacts}}</el-descriptions-item>
      <el-descriptions-item label="联系手机:">{{orderInfo.phone}}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts">

export default {
  name: 'orderInfo',
  props: {
    orderInfo: {
      type: Object
    },
  },
  setup() {

  },
};
</script>