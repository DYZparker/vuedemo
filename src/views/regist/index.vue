<template>
  <div class="login-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
      <h2 class="login-title">学生管理系统注册</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="backlogin">返回登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
  import { regist } from '../../api/regist'

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
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePassagain = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
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
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            regist(this.ruleForm.username, this.ruleForm.password).then(
              response => {
                console.log(response)
              }
            )
            // this.$router.push('/');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      backlogin() {
        this.$router.push('/login');
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
// .login-button {
//   text-align: center;
// }
</style>