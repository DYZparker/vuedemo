<template>
  <div class="login-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
      <h2 class="login-title">学生管理系统</h2>
      <el-form-item label="学号" prop="num">
        <el-input v-model="ruleForm.num"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass"></el-input>
      </el-form-item>
      <div class="login-button">
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </el-form>
  </div>
</template>


<script>
  export default {
    data() {
      var checkNum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('学号不能为空'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          num: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          num: [
            { validator: checkNum, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!!');
            this.$router.push('/');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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