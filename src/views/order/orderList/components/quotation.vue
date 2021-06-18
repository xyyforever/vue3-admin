<template>
  <div class="quotation">
    <order-info :order-info="orderInfo"/>
    <div class="mb20">
      <el-descriptions title="检测需求">
        <el-descriptions-item label="检测对象:">{{orderInfo.testRequirement}}</el-descriptions-item>
        <el-descriptions-item label="检测方法:">{{orderInfo.testMethod}}</el-descriptions-item>
        <el-descriptions-item label="报告资质:">{{orderInfo.reportQualifications}}</el-descriptions-item>
        <el-descriptions-item label="报告语言:">{{orderInfo.reportLanguage}}</el-descriptions-item>
        <el-descriptions-item label="检测目的:">{{orderInfo.testReason}}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="mb20">
      <el-descriptions title="检测报价">
        <el-descriptions-item label="报价金额:"><span style="color: red">¥{{quotationInfo.quotationPrice}}</span></el-descriptions-item>
      </el-descriptions>
      <el-descriptions>
        <el-descriptions-item label="报价时间:">{{quotationInfo.createTime}}</el-descriptions-item>
        <el-descriptions-item label="操作人:">{{ quotationInfo.createName }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions>
        <el-descriptions-item label="报价单名称:">{{quotationInfo.quotationName}}</el-descriptions-item>
      </el-descriptions>
      <el-button @click="handleViewFile(quotationInfo.fileUrl)">查看</el-button>
    </div>
    <div class="el-descriptions__title">历史报价</div>
    <el-table :data="quotationList.records" style="width: 100%" stripe height="300px">
      <el-table-column prop="id" label="编号" align="center"></el-table-column>
      <el-table-column prop="quotationPrice" label="报价金额" align="center"></el-table-column>
      <el-table-column prop="createTime" label="报价时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <div class="table-button">
            <text @click="handleViewFile(scope.row.fileUrl)">查看</text>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">

import {onMounted, reactive, toRefs} from "vue";
import OrderInfo from "@/views/order/orderList/components/orderInfo.vue";
import api from "@/views/order/api";
import {QuotationInfo} from "@/views/order/orderList/interface";
import http from "@/api";
import {handleViewFile} from "@/views/order/orderList/services";

export default {
  name: 'quotation',
  components: {OrderInfo},
  props: {
    orderInfo: {
      type: Object
    },
  },
  setup(props: any) {
    const state = reactive({
      quotationInfo: {} as QuotationInfo,
      quotationList: {
        records: [] as QuotationInfo[],
      },
    })
    onMounted(() => {
      // 获取报价表信息
      api.getQuotationById({id: props.orderInfo.quotationId}).then(res => {
        if (res.status === 'ok') {
          state.quotationInfo = res.data
        }
      })
      // 获取历史报价表信息
      const params = {
        pageNum: 1,
        pageSize: 99,
        orderNo: props.orderInfo.orderNo
      }
      api.getQuotationByPage(params).then(res => {
        if (res.status === 'ok' && res.data) {
          state.quotationList.records = res.data
        }
      })
    })
    return {
      ...toRefs(state),
      handleViewFile
    }
  },
};
</script>
<style scoped lang="scss">
.quotation {
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