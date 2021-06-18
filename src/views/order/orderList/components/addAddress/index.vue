<template>
  <el-dialog
      v-model="dialog.isShow"
      :title="dialog.title"
      :show-close="true"
      :width="dialog.width"
      center
      @close="handleDialogClose"
  >
    <el-form ref="formRef" :model="formData.form" label-width="80px">
      <el-form-item
          label="联系人"
          prop="addressName"
          :rules="[{required: true,message: '请输入姓名'}]">
        <el-input
            v-model.trim="formData.form.addressName"
            clearable
            maxlength="32"
            placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item
          label="联系方式"
          prop="addressMobile"
          maxlength="11"
          :rules="[{required: true,message: '请输入正确的联系方式', pattern: /^1[3-9]\d{9}$/}]">
        <el-input
            v-model.trim="formData.form.addressMobile"
            clearable
            maxlength="11"
            placeholder="请输入联系方式"
        ></el-input>
      </el-form-item>
      <el-form-item
          label="所在地"
          prop="addressCountry"
          :rules="[{required: true,message: '请选择所在地'}]">
        <elui-china-area-dht
            @change="handleAddressOnChange"
            placeholder="请选择所在地"
        ></elui-china-area-dht>
      </el-form-item>
      <el-form-item
          label="详细地址"
          prop="addressMobile"
          :rules="[{required: true,message: '请输入详细地址'}]">
        <el-input
            v-model.trim="formData.form.addressDetailed"
            clearable
            maxlength="255"
            placeholder="请输入详细地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input
            v-model.trim="formData.form.customerName"
            disabled
            maxlength="64"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
        <el-button @click="handleDialogClose">取消</el-button>
        <el-button type="primary" @click="handleDialogConfirm">确认</el-button>
      </span>
  </el-dialog>
</template>

<script lang="ts" src="./index.ts"></script>
