<template>
  <div class="application">
    <order-info :order-info="orderInfo"/>
    <div class="mb20">
      <div v-if="applicationInfo && Object.keys(applicationInfo).length">
        <el-descriptions title="检测申请表">
          <el-descriptions-item label="申请表名称:">{{applicationInfo.applicationName}}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions>
          <el-descriptions-item label="上传时间:">{{applicationInfo.createTime}}</el-descriptions-item>
          <el-descriptions-item label="操作人:">{{applicationInfo.createName}}</el-descriptions-item>
        </el-descriptions>
      </div>
      <el-button type="primary" @click="dialog.isShow = true">更新申请表</el-button>
      <el-button v-if="orderInfo.applicationId" @click="handleViewFile(applicationInfo.fileUrl)">查看</el-button>
    </div>
    <div class="el-descriptions__title">历史上传</div>
    <el-table :data="applicationList.records" style="width: 100%" stripe height="400px">
      <el-table-column prop="id" label="编号" align="center"></el-table-column>
      <el-table-column prop="applicationName" label="申请表" align="center"></el-table-column>
      <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
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
        :title="dialog.title"
        :show-close="true"
        :width="dialog.width"
        center
        @close="handleDialogClose"
    >
      <order-info :order-info="orderInfo"/>
      <div class="el-descriptions__title mb10">检测申请表</div>
      <el-upload
          ref="refUpload"
          class="mb20"
          :action="uploadUrl"
          :headers="headers"
          :limit="1"
          :on-exceed="handleOnExceed"
          :on-success="handleSuccess"
          :on-error="handleUploadError"
          :accept="'.pdf'"
      ><el-button size="small" icon="el-icon-upload">上传申请表</el-button>
        <template #tip>
          <div class="el-upload__tip">
            支持扩展名:.pdf
          </div>
        </template>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.isShow = false">取消</el-button>
        <el-button type="primary" @click="handleUploadApplication">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">

import {onMounted, reactive, ref, toRefs} from "vue";
import OrderInfo from "@/views/order/orderList/components/orderInfo.vue";
import api from "@/views/order/api";
import {ApplicationInfo} from "@/views/order/orderList/interface";
import {HEADERS, UPLOAD_URL} from "@/utils/upload";
import {ElMessage} from "element-plus";
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
    let _url: string
    const refUpload: any = ref(null)
    const state = reactive({
      uploadUrl: UPLOAD_URL,
      headers: HEADERS,
      dialog: {
        isShow: false,
        width: "600px",
        title: "更新申请表",
      },
      applicationInfo: {} as ApplicationInfo,
      applicationList: {
        records: [] as ApplicationInfo[],
        page: 1,
        total: 10,
        current: 1
      },
    })
    onMounted(() => {
      _initPage()
    })
    const _initPage = () => {
      // 获取申请表信息
      api.getApplicationByOrder({orderNo: props.orderInfo.orderNo}).then(res => {
        if (res.status === 'ok') {
          state.applicationInfo = res.data
        }
      })
      // 获取申请表历史 无需分页 pageSize写死99
      const params = {
        pageNum: state.applicationList.page,
        pageSize: 99,
        orderNo: props.orderInfo.orderNo
      }
      api.getApplicationByPage(params).then(res => {
        if (res.status === 'ok' && res.data) {
          state.applicationList.records = res.data
          state.applicationList.total = res.total
        }
      })
    }
    return {
      refUpload,
      ...toRefs(state),
      handleOnExceed: () => {
        ElMessage.error('文件数量超出限制,请删除后上传')
      },
      handleViewFile,
      // 上传到oss
      handleSuccess: (data: any) => {
        if (data.code === 200) {
          _url = data.data
        } else {
          ElMessage.error('上传失败')
        }
      },
      handleDialogClose: () => {
        console.dir(refUpload.value)
        refUpload.value.clearFiles()
        _url = ''
      },
      handleUploadError: () => {
        ElMessage.error('上传失败')
      },
      handleUploadApplication: () => {
        if (_url){
          const params = {
            fileUrl: _url,
            orderNo: props.orderInfo.orderNo
          }
          api.uploadApplication(params).then(res => {
            if (res.status === 'ok') {
              state.dialog.isShow = false
              ElMessage.success('上传成功')
              _initPage()
            }
          })
        } else {
          ElMessage.info('请上传文件')
        }
      },
    }
  },
};
</script>
<style scoped lang="scss">
.application {
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