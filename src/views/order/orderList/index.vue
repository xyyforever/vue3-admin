<template>
  <div class="orderList">
    <div class="fr jsb ac title mb10">
      <div>
        <h1>订单列表</h1>
      </div>
    </div>
    <el-form ref="formInlineRef" :inline="true" class="demo-form-inline" label-width="90px">
      <div>
        <el-form-item>
          <el-input
              v-model.trim="searchParams.orderNo"
              clearable
              maxlength="16"
              placeholder="订单编号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
              v-model.trim="searchParams.customerName"
              clearable
              maxlength="64"
              placeholder="客户名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
              v-model.trim="searchParams.phone"
              clearable
              maxlength="11"
              placeholder="联系手机"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="searchParams.customerType" placeholder="客户类型">
            <el-option
                v-for="item in customerTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
              v-model.trim="searchParams.sellerName"
              clearable
              maxlength="64"
              placeholder="售卖商户"
          ></el-input>
        </el-form-item>
      </div>
      <div class="mb20">
        <el-form-item>
          <el-input
              v-model.trim="searchParams.testRequirement"
              clearable
              maxlength="64"
              placeholder="检测对象"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="80px">
          <el-input
              v-model.trim="searchParams.createName"
              clearable
              maxlength="32"
              placeholder="创建人"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
              v-model="searchParams.createTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 100%"
              format="YYYY-MM-DD">
          </el-date-picker>
        </el-form-item>
        <el-button class="i-btn i-btn-search mr10 ml10" type="primary" @click="handleGetOrderByPage">查询</el-button>
        <el-button class="i-btn i-btn-clear" type="text" @click="handleResetSearchParams">重置</el-button>
      </div>
      <div>
        <el-form-item label="订单状态">
          <el-select clearable v-model="searchParams.applicationState" placeholder="申请表状态">
            <el-option
                v-for="item in applicationStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="searchParams.contractState" placeholder="合同状态">
            <el-option
                v-for="item in contractStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="searchParams.payState" placeholder="支付状态">
            <el-option
                v-for="item in payStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="searchParams.logisticsState" placeholder="物流状态">
            <el-option
                v-for="item in expressStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="searchParams.reportState" placeholder="报告状态">
            <el-option
                v-for="item in reportStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <el-table :data="orderList" style="width: 100%" stripe max-height="500">
      <el-table-column prop="orderNo" label="订单编号" align="center" width="150"></el-table-column>
      <el-table-column prop="customerName" label="客户名称" header-align="center" width="150"></el-table-column>
      <el-table-column prop="contacts" label="联系人" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系手机" align="center" width="120"></el-table-column>
      <el-table-column prop="sellerName" label="售卖商户" align="center" width="150"></el-table-column>
      <el-table-column prop="testRequirement" label="检测对象" align="center" width="80"></el-table-column>
      <el-table-column prop="testMethod" label="检测方法" align="center" width="120"></el-table-column>
      <el-table-column prop="reportQualifications" label="报告资质" align="center" width="120"></el-table-column>
      <el-table-column prop="reportLanguage" label="报告语言" align="center" width="80"></el-table-column>
      <el-table-column prop="testReason" label="检测目的" align="center" width="120"></el-table-column>
      <el-table-column prop="orderPrice" label="订单金额" header-align="center" align="right" width="80"></el-table-column>
      <el-table-column prop="createName" label="创建人" align="center" width="100"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" width="240"></el-table-column>
      <el-table-column label="操作" width="300" align="center" fixed="right">
        <template #default="scope">
          <div class="mini-button">
            <text @click="handleOpenDrawer('quotation', scope.row)">报价单</text>
            <text @click="handleOpenDrawer('application', scope.row)">申请表</text>
            <text @click="handleOpenDrawer('contract', scope.row)">合同</text>
            <text @click="handleOpenDrawer('express', scope.row)">快递</text>
            <text @click="handleOpenDrawer('report', scope.row)">报告</text>
            <text @click="handleOpenDrawer('pay', scope.row)">支付</text>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @current-change="handlePageChange"
        @size-change="handlePageSizeChange"
        :current-page="pageData.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.total"
    ></el-pagination>
    <el-drawer
        :title="drawerTitle"
        v-model="showDrawer"
        :size="'50%'"
        @close="handleClose"
        destroy-on-close
    >
      <component
          :is="componentName"
          :order-info="orderInfo"
          @close-drawer="handleClose"
      />
    </el-drawer>
  </div>
</template>

<script lang="ts">
import {onMounted, reactive, toRefs} from "vue";
import quotation from './components/quotation.vue'
import application from './components/application.vue'
import contract from './components/contract.vue'
import express from './components/express.vue'
import report from './components/report.vue'
import pay from './components/pay.vue'
import api from "../api";
import {OrderInfoType, SearchParams} from "@/views/order/orderList/interface";
import {
  applicationStatus,
  contractStatus,
  customerTypes,
  expressStatus,
  payStatus, reportStatus
} from "@/views/order/orderList/services";
import {usePage} from "@/utils/page";

// 右边Drawers 类型
const Drawers = {
  quotation: 'quotation',
  application: 'application',
  contract: 'contract',
  express: 'express',
  report: 'report',
  pay: 'pay',
}

export default {
  name: 'orderList',
  components: {
    quotation,
    application,
    contract,
    express,
    report,
    pay
  },
  setup() {
    const {pageData, handleTotalChange} = usePage()
    const {pageSize, pageNum} = pageData
    const state = reactive({
      customerTypes,
      applicationStatus,
      contractStatus,
      expressStatus,
      reportStatus,
      searchParams: {} as SearchParams,
      orderInfo: {} as OrderInfoType, // 订单信息
      orderList: [],
      showDrawer: false,
      drawerTitle: '',
      componentName: '',
    })
    onMounted(() => {
      _search(pageSize, pageNum)
    })
    // 搜索列表
    const _search = (pageSize: number, pageNum: number) => {
      // 创建时间 参数判断
      if (state.searchParams.createTime){
        state.searchParams.startTime = state.searchParams.createTime[0]
        state.searchParams.endTime = state.searchParams.createTime[1]
      } else {
        if (state.searchParams.startTime) delete state.searchParams.startTime
        if (state.searchParams.endTime) delete state.searchParams.endTime
      }
      api.getOrderByPage({...state.searchParams, pageSize, pageNum}).then(res => {
        console.log(res, 'res')
        if (res.status === 'ok' && res.data) {
          state.orderList = res.data
          handleTotalChange(res.total)
        }
      })
    }
    return {
      ...toRefs(state),
      pageData,
      payStatus,

      // 关闭右侧Drawer
      handleClose: () => {
        state.showDrawer = false
        _search(pageSize, pageNum)
      },

      // 页码变化
      handlePageChange: (pageNum: number) => {
        _search(pageSize, pageNum)
      },

      // 打开右侧Drawer
      handleOpenDrawer: (type: string, item:any) => {
        state.showDrawer = true
        state.componentName = type
        state.orderInfo = item as OrderInfoType
        if (type === Drawers.quotation) {
          state.drawerTitle = '报价单'
        } else if (type === Drawers.application) {
          state.drawerTitle = '申请表'
        } else if (type === Drawers.contract) {
          state.drawerTitle = '合同'
        } else if (type === Drawers.express) {
          state.drawerTitle = '快递'
        } else if (type === Drawers.report) {
          state.drawerTitle = '报告'
        } else if (type === Drawers.pay) {
          state.drawerTitle = '支付'
        }
      },

      // 查询订单列表数据
      handleGetOrderByPage: () => {
        _search(pageSize, pageNum)
      },

      // 重置查询条件
      handleResetSearchParams: () => {
        state.searchParams = {
          pageNum : 1,
          pageSize : 10
        }
      },

      // 分页每页个数变化
      handlePageSizeChange: (pageSize: number) => {
        _search(pageSize, pageNum)
      },
    }
  },
};
</script>
<style lang="scss" src="./index.scss" scoped></style>
