<template>
  <div class="login-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
      <h2 class="login-title">学生管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" v-if="!trigger">
        <el-input type="password" v-model="ruleForm.checkPass"></el-input>
      </el-form-item>
      <el-form-item v-if="!trigger">
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="changeTrigger('ruleForm')">返回登录</el-button>
      </el-form-item>
      <div class="login-button" v-if="trigger">
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="changeTrigger('ruleForm')">注册</el-button>
      </div>
    </el-form>
  </div>
</template>


<script>
  import { login, regist, getUserInfo } from '@/api/login'
  import { getToken, setToken, setUser, removeUser } from '@/utils/auth'

  export default {
    data() {
      const checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        } else {
          callback();
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      const validatePassagain = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        trigger :true,
        ruleForm: {
          username: '',
          password: '',
          checkPass: ''
        },
        rules: {
          username: [
            { validator: checkUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePassagain, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.trigger) {
              return this.$store.dispatch('Login', this.ruleForm).then(
                response => {
                  if(response.err_code === 0) {
                    return (() => {
                      this.$message({
                        message: response.message,
                        type: 'success'
                      })
                      this.$router.push('/')
                    })();
                  }
                  this.$message({
                    message: response.message,
                    type: 'warning'
                  })
                }
              ).catch(error => {
                console.log(error.response.data.message)
              })
            }
            regist(this.ruleForm.username, this.ruleForm.password).then(
              response => {
                if(response.data.flag) {
                  return (() => {
                    this.$message({
                      message: response.data.message,
                      type: 'success'
                    })
                    //注册成功返回登录并清空输入框
                    this.trigger = !this.trigger
                    this.resetForm(formName)
                  })()
                }
                this.$message({
                  message: response.data.message,
                  type: 'warning'
                })
              }
            ).catch(error => {
                console.log(error.response.data.message)
              })
          } else {
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      changeTrigger(formName) {
        this.resetForm(formName)
        this.trigger = !this.trigger;
      }
    }
  }
</script>

<style lang="scss" scope>
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('../../assets/imgs/loginbg.jpg') 100% 100%;
}
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