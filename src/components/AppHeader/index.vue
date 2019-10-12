<template>
  <div class="header">
    <a href="/">学生管理系统</a>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{user}} 登陆成功<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">修改密码</el-dropdown-item>
        <el-dropdown-item command="b">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="400px" center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input v-model="ruleForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { checkPassword, changePassword } from '@/api/password'
  import { REMOVE_USER } from '@/store/mutation_types'

  export default {
    data(){
      const checkOldPass = (rule, value, callback) => {
        checkPassword(this.user.id, this.ruleForm.oldPass).then(response => {
          if(response.data.flag) {
            callback()
          }else {
            callback(new Error(response.data.message))
          }
        })
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
        user: '',
        dialogFormVisible: false,
        ruleForm: {
          oldPass: '',
          password: '',
          checkPass: ''
        },
        rules: {
          oldPass: [
            { validator: checkOldPass, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePassagain, trigger: 'blur' }
          ]
        }
      }
    },

    methods: {
      handleCommand(command) {
        switch (command) {
          case 'a':
            this.handleDialog()
            break;
          case 'b':
            this.$store.commit(REMOVE_USER)
            this.$router.push('/login')
            break;
          default:
            break;
        }
      },

      handleDialog() {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['ruleForm'].resetFields()
        })
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            return changePassword(this.user.id, this.ruleForm.password).then(
              response => {
                if(response.data.flag) {
                  return (() => {
                    this.$message({
                      message: response.data.message,
                      type: 'success'
                    })
                    //修改密码成功清除user并跳转至登录页
                    this.$store.commit(REMOVE_USER)
                    this.$router.push('/login')
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
      }
    },

    created() {
      this.user = this.$store.state.user.user.username
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