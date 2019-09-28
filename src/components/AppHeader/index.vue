<template>
  <div class="header">
    <a href="/">学生管理系统</a>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        登陆成功<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">修改密码</el-dropdown-item>
        <el-dropdown-item command="b">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      }
    }
  }
</script>

<style lang="scss" scope>
.header {
  a {
    color: #fff;
    padding-left: 50px;
  }
}
.el-dropdown {
  float: right;
  margin-right: 50px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>