<template>
  <div class="navbar">
    <el-menu
      router
      default-active="/home"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/information">
        <i class="el-icon-s-custom"></i>
        <span slot="title">学生信息</span>
      </el-menu-item>
      <el-menu-item index="/achievement">
        <i class="el-icon-document"></i>
        <span slot="title">学生成绩</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scope>
</style>