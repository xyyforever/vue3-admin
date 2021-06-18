<template>
  <div class="express">
    <order-info :order-info="orderInfo"/>
    <div v-if="orderPlaced">
      <div class="mb20">
        <el-descriptions title="快递信息">
          <el-descriptions-item label="寄件人:">{{ expressInfo.sendName }}</el-descriptions-item>
          <el-descriptions-item label="寄件人手机:">{{ expressInfo.sendMobile }}</el-descriptions-item>
          <el-descriptions-item label="寄件人地址:">{{ expressInfo.sendAddress }}</el-descriptions-item>
          <el-descriptions-item label="快递状态:">
            {{ getExpressInfoStatus(expressInfo.logisticsState) }}
          </el-descriptions-item>
          <el-descriptions-item label="物流公司:">{{ expressInfo.logisticsName }}</el-descriptions-item>
          <el-descriptions-item label="物流单号:">{{ expressInfo.paackNo }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="el-descriptions__title mb20">物流跟踪</div>
      <el-table
          :data="traceInfo"
          style="width: 100%"
          stripe
          :show-header="false"
      >
        <!--        <el-table-column prop="opeTitle" align="center"></el-table-column>-->
        <el-table-column prop="opeRemark" align="center"></el-table-column>
        <el-table-column prop="opeTime" align="center"></el-table-column>
      </el-table>
    </div>
    <div v-else>
      <el-row>
        <el-col>
          <div class="el-descriptions__title">取件时间</div>
          <el-form ref="formRef" :model="form" label-width="120px">
            <el-form-item
                label="上门取件时间:"
                prop="pickupStartTime"
                :rules=" [{
                    required: true,
                    message: '请选择上门取件时间'
                  }]">
              <el-date-picker
                  v-model="form.pickupStartTime"
                  type="datetime"
                  placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col class="mb20">
          <div class="flex flex-between">
            <div class="el-descriptions__title mb10">寄件地址</div>
            <div class="color_1890FF" @click="dialog.isShow = true">添加地址</div>
          </div>
          <el-table
              :data="addressList"
              style="width: 100%"
              stripe
              :show-header="false"
          >
            <el-table-column label="选择" width="55">
              <template #default="scope">
                <el-radio v-model="tableRadio" :label="scope.row.id"><i></i></el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="addressName" align="center"></el-table-column>
            <el-table-column prop="addressMobile" align="center"></el-table-column>
            <el-table-column prop="addressFullName" align="center"></el-table-column>
            <el-table-column width="80" align="center">
              <template #default="scope">
                <div class="mini-button">
                  <el-button type="danger" @click="handleAddressDelete(scope.row)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col>
          <el-button @click="handleDrawerClose">取消</el-button>
          <el-button type="primary" @click="handleOrderPlace">确认</el-button>
        </el-col>
      </el-row>
    </div>
    <add-address
        v-if="dialog.isShow"
        :dialog="dialog"
        :order-info="orderInfo"
        @close="handleAddAddressClose"
    ></add-address>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref, toRefs} from "vue";
import OrderInfo from "@/views/order/orderList/components/orderInfo.vue";
import api from "@/views/order/api";
import AddAddress from "./addAddress/index.vue";
import {AddressInfo, ExpressInfo, OrderInfoType} from "@/views/order/orderList/interface";
import {orderExpressStatus} from "@/views/order/orderList/services";
import {ElMessage} from "element-plus";
import moment from 'moment';

export default defineComponent({
  name: 'quotation',
  components: {OrderInfo, AddAddress},
  props: {
    orderInfo: {
      type: Object
    },
  },
  setup(props: any, {emit}) {
    const orderInfo: OrderInfoType = props.orderInfo
    const formRef = ref()
    const state = reactive({
      dialog: {
        isShow: false,
        width: "600px",
        title: "新增地址",
      },
      form: {} as any,
      orderPlaced: true, // 显示下单页面
      addressList: [], // 地址列表
      tableRadio: 0, // 当前选择地址下标
      expressInfo: {} as ExpressInfo, // 物流信息
      traceInfo: [] // 物流轨迹列表
    })
    onMounted(() => {
      if(orderInfo.logisticsState === 0) {
        state.orderPlaced = false
      } else {
        state.orderPlaced = true
      }
      _initPage()
    })
    const _initPage = () => {
      if (!state.orderPlaced) {
        // 待下单 显示下单页
        // 获取地址列表
        const params = {
          type: '2',
          userId: orderInfo.customerNo
        }
        api.getAddressList(params).then(res => {
          state.addressList = res
        })
      } else {
        // 非下单页
        state.orderPlaced = true
        // 获取物流 基本信息 轨迹信息
        const getWaybillTrace = () => {
          api.getWaybillTrace({orderNo: orderInfo.orderNo}).then(res => {
            if (res.status === 'ok' && res.data) {
              state.expressInfo = res.data.orderInfo
              state.traceInfo = res.data.traceInfo
            }
          })
        }
        getWaybillTrace()
        // 2秒请求一次 获取物流轨迹信息
        setTimeout(() => {
          if (!(state.traceInfo && state.traceInfo.length)) {
            getWaybillTrace()
          }
        }, 2000);
      }
    }
    const getPlaceOrderParams = () => {
      const item = state.addressList.find((item: any) => item.id === state.tableRadio)
      if (item) {
        const address: AddressInfo = item
        return {
          pickupAddress: address.addressFullName,
          pickupName: address.addressName,
          pickupTel: address.addressMobile,
          customerTel: orderInfo.phone,
          customerContract: orderInfo.contacts,
          orderId: orderInfo.orderNo,
          pickupStartTime: moment(state.form.pickupStartTime).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    }
    return {
      formRef,
      ...toRefs(state),

      // 获取状态label
      getExpressInfoStatus: (value: number) => {
        const item = orderExpressStatus.find(x => x.value === value)
        if (item) {
          return item.label
        }
      },

      // 下单
      handleOrderPlace: () => {
        if (state.tableRadio === 0) {
          ElMessage.info('请选择取件地址')
          return
        }
        if (state.form.pickupStartTime && state.form.pickupStartTime.getTime() < Date.now()) {
          ElMessage.info('取件时间要大于当前时间')
          return
        }
        formRef.value.validate((val: boolean) => {
          if (!val) return
          ElMessage.closeAll()
          const params: any = getPlaceOrderParams() || {}
          console.log(params.pickupStartTime, 'pickupStartTime')
          api.getPickupOrderReceive(params).then(res => {
            if (res) {
              // 已经下单 显示非下单页面
              state.orderPlaced = true
              _initPage()
            }
          })
        })
      },

      // 地址dialog关闭
      handleAddAddressClose: (refresh: boolean) => {
        state.dialog.isShow = false
        if (refresh) {
          _initPage()
        }
      },

      // 关闭右侧drawer
      handleDrawerClose: () => {
        emit('closeDrawer')
      },
      // 删除地址
      handleAddressDelete: (row: any) => {
        api.deleteAddress({id: row.id}).then(res => {
          if (res.status === 'ok') {
            ElMessage.success('删除成功')
            _initPage()
          }
        })
      }
    }
  },
});
</script>
<style scoped lang="scss">
.express {
  width: 100%;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
}

.table-button {
  color: #1890ff;

  text {
    margin-right: 8px;
  }
}
</style>