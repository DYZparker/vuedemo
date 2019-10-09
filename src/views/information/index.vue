<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="学号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.region" placeholder="性别">
          <el-option label="男" value="boy"></el-option>
          <el-option label="女" value="girl"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="dateValue"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="onSubmit">新增</el-button>
        <el-button @click="onSubmit">重置</el-button>
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        dateValue: '',
        totalList: null,
        currentPage: 1,
        currentSize: 10,
        tableData: []
      }
    },

    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      onSubmit() {
        console.log('submit!');
      },
      refreshList() {
        this.$store.dispatch('GetStudentList', {page: this.currentPage, size: this.currentSize}).then(response => {
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
        const Gender = row.gender ? '男' : '女'
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