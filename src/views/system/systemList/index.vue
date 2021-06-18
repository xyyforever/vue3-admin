<template>
  <div class="merchantList">
    <div class="fr jsb ac pb20" style="border-bottom: 1px solid #f5f5f5">
      <div>
        <h1>商户列表</h1>
      </div>
      <div class="mr60">
        <el-button size="medium" type="primary" @click="edit(1, -1)">添加模板</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: 'merchantList',
  setup() {

  },
};
</script>
<style lang="scss" src="./index.scss" scoped></style>
