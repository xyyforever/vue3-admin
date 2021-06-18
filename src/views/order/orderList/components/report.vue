<template>
  <div class="report">
    <order-info :order-info="orderInfo"/>
    <div class="mb20">
      <div class="el-descriptions__title">检测报告</div>
      <el-table
          :data="reportInfo"
          style="width: 100%"
          stripe
          :show-header="false"
      >
        <el-table-column prop="reportName" align="center"></el-table-column>
        <el-table-column prop="createTime" align="center"></el-table-column>
        <el-table-column prop="createName" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <div class="table-button">
              <text @click="handleViewFile(scope.row.fileUrl)">查看</text>
            </div>
          </template>

        </el-table-column>
      </el-table>
      <el-button type="primary" class="mt10" @click="dialog.isShow = true">更新报告</el-button>
    </div>
    <div class="el-descriptions__title">历史上传</div>
    <el-table :data="reportList.records" style="width: 100%" stripe height="400px">
      <el-table-column prop="id" label="编号" align="center"></el-table-column>
      <el-table-column prop="reportName" label="申请表" align="center"></el-table-column>
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
      <div class="el-descriptions__title mb10">检测报告</div>
      <el-upload
          ref="refUpload"
          class="mb20"
          :action="uploadUrl"
          :headers="headers"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :on-error="handleUploadError"
          :before-upload="handleBeforeUpload"
      >
        <el-button size="small" icon="el-icon-upload">上传报告</el-button>
        <template #tip>
          <div class="el-upload__tip">
            支持扩展名:.pdf
          </div>
        </template>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.isShow = false">取消</el-button>
        <el-button type="primary" @click="handleUploadReport">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref, toRefs} from "vue";
import OrderInfo from "@/views/order/orderList/components/orderInfo.vue";
import {HEADERS, UPLOAD_URL} from "@/utils/upload";
import {ReportInfo} from "@/views/order/orderList/interface";
import api from "@/views/order/api";
import {ElMessage} from "element-plus";
import {handleViewFile} from "@/views/order/orderList/services";

export default defineComponent({
  name: 'report',
  components: {OrderInfo},
  props: {
    orderInfo: {
      type: Object
    },
  },
  setup(props: any) {
    const refUpload:any = ref()
    const state = reactive({
      fileList: [] as any[],
      uploadUrl: UPLOAD_URL,
      headers: HEADERS,
      dialog: {
        isShow: false,
        width: "600px",
        title: "上传报告",
      },
      reportInfo: [] as ReportInfo[],
      reportList: {
        records: [] as ReportInfo[]
      },
    })
    onMounted(() => {
      _initPage()
    })
    const _initPage = () => {
      // 获取报告信息
      const params = {
        orderNo: props.orderInfo.orderNo
      }
      api.getReportInfo(params).then(res => {
        if (res.status === 'ok' && res.data) {
          state.reportList.records = res.data.hisReports
          state.reportInfo = res.data.reportInfo
        }
      })
    }
    return {
      refUpload,
      ...toRefs(state),
      handleViewFile,
      handleRemove: (file: any) => {
        // 移除文件时 删除文件数组指定文件
        const index = state.fileList.findIndex(item => item.file.uid === file.uid)
        if (index > -1) state.fileList.splice(index, 1)
      },
      // 上传到oss
      handleSuccess: (data: any, file: any) => {
        if (data.code === 200) {
          state.fileList.push({
            url: data.data,
            file,
          })
        } else {
          ElMessage.error('上传失败')
        }
      },
      handleUploadError: () => {
        ElMessage.error('上传失败')
      },
      handleBeforeUpload: (file: any) => {
        const files: any[] = state.fileList.map((x:any) => x.file)
        const index = files.findIndex(item => item.name === file.name)
        if (index > -1) {
          ElMessage.error('该文件已存在')
          return false
        }
      },
      handleDialogClose: () => {
        state.fileList = []
        refUpload.value.clearFiles()
      },
      handleUploadReport: () => {
        const params = {
          files: state.fileList.map((x: any) => x.url),
          orderNo: props.orderInfo.orderNo
        }
        api.uploadReport(params).then(res => {
          state.dialog.isShow = false
          if (res.status === 'ok') {
            ElMessage.success('上传成功')
            _initPage()
          } else {
            ElMessage.success('上传失败')
          }
        })
      },
    }
  },
});
</script>
<style scoped lang="scss">
.report {
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
