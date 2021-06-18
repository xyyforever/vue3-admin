<template>
    <div class="logo">
      <img src="../../assets/baijian.png" alt="">
    </div>
    <section class="x-login">
      <section class="pwd-login">
        <h2 class="title mb10">百检运营管理系统</h2>
        <el-form ref="ruleForm" :model="form" :rules="rules">
          <el-form-item prop="account">
            <el-input
                readonly
                class="mb10"
                prefix-icon="el-icon-user"
                v-model.trim="form.account"
                placeholder="请输入用户账号"
                @focus="(e) => {e.target.removeAttribute('readonly')}"
                clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                class="mb10"
                readonly
                prefix-icon="el-icon-lock"
                type="password"
                v-model.trim="form.password"
                placeholder="请输入用户密码"
                @focus="(e) => {e.target.removeAttribute('readonly')}"
                @keyup.enter.native="login"
                clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button class="login-btn" @click="login">登录</el-button>
        <span class="companyDis">Copyright@2019 百检（上海）信息科技有限公司</span>
      </section>
    </section>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import api from "@/api/index";

export default defineComponent({
  setup(props, ctx) {
    const ruleForm = ref()
    const router = useRouter()
    const state = reactive({
      form: {
        account: '17621214971',
        password: '0659c7992e268962384eb17fafe88364'
      },
      rules: {
        account: [{ required: true, message: '账号不能为空', trigger: ['change', 'blur'] }],
        password: [{ required: true, message: '密码不能为空', trigger: ['change', 'blur'] }]
      },
    })
    const login = () => {
      ruleForm.value.validate((val: boolean) => {
        if (!val) return
        ElMessage.closeAll()
        const params = {
          grant_type: 'password',
          scope: 'all',
          username: state.form.account,
          password: state.form.password
        }
        api.getToken(params).then(res => {
          if (res.status === 'ok' && res.data) {
            localStorage.setItem('TOKEN', res.data.access_token)
            console.log(res.data, 'token')
            router.push({
              path: '/home'
            })
          }
        })
      })
    }
    return {
      ...toRefs(state),
      login,
      ruleForm
    }
  }
})
</script>

<style lang="scss" scoped>
.logo{
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 500px;
  background: #ffffff;
  border: 1px solid #e8e8e8;
}
.x-login {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #ffffff;
  .pwd-login {
    border-radius: 10px;
    text-align: center;
    margin-top: 200px;
  }
  .title {
    padding-bottom: 30px;
    font-size: 36px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    color: #000000;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 200px;
    background: #e90001;
    color: #ffffff;
  }
  .companyDis {
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    color: #333333;
  }
}
</style>
