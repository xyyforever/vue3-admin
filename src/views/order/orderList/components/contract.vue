<template>
  <div class="contract">
    <order-info :order-info="orderInfo"/>
    <div class="mb20" v-if="contractInfo && Object.keys(contractInfo).length">
      <el-descriptions title="检测合同">
        <el-descriptions-item label="合同状态:">{{ contractInfo.statusText }}</el-descriptions-item>
        <el-descriptions-item
            label="审核说明:"
            v-if="contractInfo.auditReasons"
        >{{ contractInfo.auditReasons }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions>
        <el-descriptions-item label="合同名称:">{{contractInfo.contractName}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions>
        <el-descriptions-item label="上传时间:">{{contractInfo.createTime}}</el-descriptions-item>
        <el-descriptions-item label="操作人:">{{contractInfo.createName}}</el-descriptions-item>
      </el-descriptions>
      <el-button
          v-if="contractInfo.contractState === 1"
          type="primary"
          @click="dialog.isShow = true"
      >审核合同</el-button>
      <el-button @click="handleViewFile(contractInfo.fileUrl)">查看</el-button>
    </div>
    <div class="el-descriptions__title">历史上传</div>
    <el-table :data="hisInfo" style="width: 100%" stripe height="400px">
      <el-table-column prop="id" label="编号" align="center"></el-table-column>
      <el-table-column prop="contractName" label="合同名称" align="center"></el-table-column>
      <el-table-column prop="statusText" label="合同状态" align="center"></el-table-column>
      <el-table-column prop="createTime" label="上传时间" align="center"></el-table-column>
      <el-table-column prop="createName" label="操作人" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <div class="table-button">
            <text @click="handleViewFile(scope.row.fileUrl)">查看</text>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        v-model="dialog.isShow"
        title="审核合同"
        :show-close="true"
        :width="dialog.width"
        center
    >
      <order-info :order-info="orderInfo"/>
      <el-descriptions title="检测合同">
        <el-descriptions-item label="合同名称:">{{ contractInfo.contractName }}</el-descriptions-item>
      </el-descriptions>
      <el-radio-group v-model="auditRadio" class="mb10">
        <el-radio :label="1">审核通过</el-radio>
        <el-radio :label="0">审核拒绝</el-radio>
      </el-radio-group>
      <el-descriptions>
        <el-descriptions-item label="审核说明:">
          <el-input
              type="textarea"
              :rows="2"
              maxlength="255"
              placeholder="请输入内容"
              v-model.trim="textarea">
          </el-input>
        </el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.isShow = false">取消</el-button>
        <el-button type="primary" @click="handleAuditContract">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">

import {onMounted, reactive, toRefs} from "vue";
import OrderInfo from "@/views/order/orderList/components/orderInfo.vue";
import api from "@/views/order/api";
import {ContractInfo} from "@/views/order/orderList/interface";
import {ElMessage} from "element-plus";
import {getStatusText, handleViewFile} from "@/views/order/orderList/services";

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
      dialog: {
        isShow: false,
        width: "600px",
        title: "审核合同",
      },
      auditRadio: 1,
      textarea: '',
      contractInfo: {} as ContractInfo,
      hisInfo: [] as ContractInfo[],
    })
    onMounted(() => {
      getContractInfo()
    })
    // 获取合同信息
    const getContractInfo = () => {
      const params = {
        orderNo: props.orderInfo.orderNo
      }
      api.getContractInfo(params).then(res => {
        if (res.status === 'ok' && res.data) {
          state.contractInfo = res.data.contractInfo
          state.contractInfo.statusText = getStatusText(state.contractInfo.contractState)
          state.hisInfo = res.data.hisInfo
          state.hisInfo.forEach(item => {
            item.statusText = getStatusText(item.contractState)
          })
        }
      })
    }
    return {
      ...toRefs(state),
      handleViewFile,
      // 审核合同
      handleAuditContract: () => {
        const params:any = {
          orderNo: props.orderInfo.orderNo,
        }
        if (state.auditRadio === 1) {
          params.status = 2
        } else {
          params.status = 3
        }
        api.auditContract(params).then(res => {
          if (res.status === 'ok') {
            state.dialog.isShow = false
            if (state.auditRadio === 1) {
              ElMessage.success("通过审核");
            } else {
              ElMessage.success("拒绝审核");
            }
          }
        })
      },
    }
  },
};
</script>
<style scoped lang="scss">
.contract {
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