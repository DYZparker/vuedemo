<template>
  <div class="login-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
      <h2 class="login-title">学生管理系统登录</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <div class="login-button">
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="regist">注册</el-button>
      </div>
    </el-form>
  </div>
</template>


<script>
  import { login } from '../../api/login'

  export default {
    data() {
      var checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        } else {
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { validator: checkUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            login(this.ruleForm.username, this.ruleForm.password).then(
              response => {
                if(response.data.flag) {
                  return (() => {
                    this.$message({
                      message: response.data.message,
                      type: 'success'
                    })
                    this.$router.push('/')
                  })()
                }
                this.$message({
                  message: response.data.message,
                  type: 'warning'
                })
              }
            )
          } else {
            return false;
          }
        });
      },

      regist() {
        this.$router.push('/regist');
      }
    }
  }
</script>

<style lang="scss" scope>
.demo-ruleForm {
  width: 350px;
  border-radius: 15px;
  background-color: rgba(255,255,255,0.8);
  margin: 180px auto;
  padding: 30px;
}
.login-title {
  color: #444;
  text-align: center;
  margin-bottom: 20px;
}
.login-button {
  text-align: center;
}
</style>