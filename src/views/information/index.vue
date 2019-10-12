<template>
  <div>
    <el-form ref="searchData" :inline="true" :model="searchData" class="demo-form-inline">
      <el-form-item prop="studentID">
        <el-input v-model="searchData.studentID" placeholder="学号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchData.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item prop="gender">
        <el-select v-model="searchData.gender" placeholder="性别">
          <el-option v-for="option in searchOpts" 
          :key="option.type"
          :label="option.name"
          :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker
          v-model="searchData.birthday"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button @click="onReset()">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      height="500"
      border
      style="width: 100%"
      :cell-style="cellStyle"
      :header-cell-style="rowClass">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="studentID" label="学号" width="100"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="birthday" label="生日" width="120"></el-table-column>
      <el-table-column prop="gender" label="性别" :formatter="ftGender" width="60"></el-table-column>
      <el-table-column prop="height" label="身高（cm）" width="100"></el-table-column>
      <el-table-column prop="weight" label="体重（kg）" width="100"></el-table-column>
      <el-table-column prop="hobbies" label="爱好" width="180"></el-table-column>
      <el-table-column prop="address" label="地址" width="220"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="currentSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalList"
      class="pagination">
    </el-pagination>

    <el-dialog title="学生信息编辑" :visible.sync="dialogFormVisible" width="400px" center>
      <el-form :model="rule" :rules="rules" ref="ruleForm" label-width="80px" size="mini">
        <el-form-item label="学号" prop="studentID">
          <el-input v-model="rule.studentID"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="rule.name"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-col>
            <el-date-picker type="date" placeholder="选择日期" v-model="rule.birthday" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="rule.gender" placeholder="性别" style="width: 110px">
              <el-option v-for="option in genderOpts" 
              :key="option.type"
              :label="option.name"
              :value="option.type"
              ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身高" prop="height">
          <el-input v-model="rule.height"></el-input>
        </el-form-item>
        <el-form-item label="体重" prop="weight">
          <el-input v-model="rule.weight"></el-input>
        </el-form-item>
        <el-form-item label="爱好" prop="hobbies">
          <el-input v-model="rule.hobbies"></el-input>
        </el-form-item>
        <el-form-item label="家庭地址" prop="address">
          <el-input v-model="rule.address"></el-input>
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
  const searchOpts = [
    {type: '0', name: '男'},
    {type: '1', name: '女'}
  ]
  const genderOpts = [
    {type: '0', name: '男'},
    {type: '1', name: '女'}
  ]
  export default {
    data() {
      return {
        searchOpts,
        genderOpts,
        searchData: {
          studentID: '',
          name: '',
          gender: '',
          birthday: ''
        },
        dateValue: '',
        totalList: null,
        currentPage: 1,
        currentSize: 10,
        tableData: [],
        dialogFormVisible: false,
        rule: {
          _id: null,
          studentID: null,
          name: '',
          birthday: '',
          gender: '',
          height: null,
          weight: null,
          hobbies: '',
          address: '',
        },
        rules: {
          studentID: [
            { required: true, message: '请输入学号', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
          ],
          // birthday: [
          //   { type: 'date', trigger: 'change' }
          // ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          // height: [
          //   { message: '请输入数字', trigger: 'blur' }
          // ],
          // weight: [
          //   { message: '请输入数字', trigger: 'blur' }
          // ],
          hobbies: [
            { type: 'string', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ]
        }
      }
    },

    methods: {
      handleAdd() {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['ruleForm'].resetFields()
        })
      },

      //将增加数据和修改数据合并到一个API，后端判断有_id就是更新，没有就添加
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            return this.$store.dispatch('AddStudent', this.rule).then(response => {
              const res = response.data
              //清空本次查询传入的_id
              this.rule._id = null
              if(res.flag){
                return (() => {
                  this.$message({
                    message: res.message,
                    type: 'success'
                  })
                  this.refreshList()
                  this.dialogFormVisible = false
                })()
              }
              this.$message({
                message: res.message,
                type: 'warning'
              })
            }).catch(error => {
              console.log(error)
            })
          } else {
            return false;
          }
        })
      },

      handleEdit(index, row) {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          //深拷贝不影响data
          const edit = JSON.parse(JSON.stringify(row))
          //选择器属性值会自动转为number，反填回选择器应该转回字符串
          if(edit.gender === 0) {
            edit.gender = '0'
          } else if(edit.gender === 1){
            edit.gender = '1'
          }
          this.rule = edit
        })
      },

      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('DelStudent', row._id).then(response => {
            const res = response.data
            if(res.flag) {
              return (() => {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
                this.refreshList()
              })()
            }
            this.$message({
              message: res.message,
              type: 'warning'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

      },

      onSearch() {
        // 检查查询条件是否都为空
        const blank = Object.values(this.searchData).some( item => item ? true : false)
        if(!blank) {
          this.$message({
              message: '请填写查询条件',
              type: 'warning'
          }); 
        }
        this.refreshList()
      },

      onReset() {
        //重置 = 先清空查询条件，再查询列表
        // this.$refs['searchData'].resetFields() //element-ui的reset会把值改为undefind
        for(const key in this.searchData) {
          this.searchData[key] = ''
        }
        this.refreshList()
      },

      refreshList() {
        const searchData = this.searchData
        //过滤空的查询对象
        for(const key in searchData) {
          if (searchData[key] === '') {
            delete searchData[key]
          }
        }
        return this.$store.dispatch('GetStudentList', {page: this.currentPage, size: this.currentSize, search: this.searchData}).then(response => {
          const res = response.data
          this.tableData = res.student
          this.totalList = res.total
        })
      },

      handleSizeChange(val) {
        this.currentSize = val
        this.refreshList()
      },

      handleCurrentChange(val) {
        this.currentPage = val
        this.refreshList()
      },

      ftGender(row) {
        const Gender = (row.gender === 0) ? '男' : '女'
        return Gender
      },

      cellStyle({row, column, rowIndex, columnIndex}) {
        return "text-align:center"
      },

      rowClass({row, rowIndex}) {
        return "text-align:center"
      }
    },

    created() {
      this.refreshList()
    }
  }
</script>

<style lang="scss" scope>
.demo-form-inline {
  padding: 20px 20px 0 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.pagination {
  margin-top: 10px;
  text-align: center;
}
</style>