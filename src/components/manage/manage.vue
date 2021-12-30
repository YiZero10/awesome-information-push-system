<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="普通用户" name="users">
        <el-table :data="users" style="width: 100%" border stripe>
          <el-table-column
            prop="id"
            label="ID"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="tel"
            label="手机号"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="studentId"
            label="学号"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="classId"
            label="专业"
            width="160"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="type"
            label="身份"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.type === 4 ? 'success' : 'primary'"
                disable-transitions
                >{{ scope.row.type | userType }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            width="200"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <el-button size="mini" @click="hanleReset(scope.row, true)">
                重置密码
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row, true)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="管理员" name="admins">
        <el-row style="margin-bottom:12px;" type="flex" justify="end">
          <el-col :span="2">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-plus"
              round
              @click="type = true"
            >
              添加
            </el-button>
          </el-col>
        </el-row>
        <el-table :data="admins" style="width: 100%" border stripe>
          <el-table-column
            prop="id"
            label="ID"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="jobId"
            label="账号"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="type"
            label="身份"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.type === 2 ? 'success' : 'primary'"
                disable-transitions
                >{{ scope.row.type | userType }}
              </el-tag>
            </template>
          </el-table-column>
          <el-tag size="small">
            <el-table-column
              prop="department"
              label="部门"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.department | Department }}
              </template>
            </el-table-column>
          </el-tag>
          <el-table-column label="操作" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="hanleReset(scope.row, false)">
                重置密码
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row, false)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <add :type="type" :btn="btn" :getdata="getData"></add>
  </div>
</template>

<script>
import add from "./add.vue";
export default {
  data() {
    return {
      type: false,
      activeName: "users",
      users: [],
      admins: []
    };
  },
  mounted() {
    this.getData(this.activeName);
  },
  components: { add },
  methods: {
    btn() {
      //关闭对话框的改变状态
      this.type = false;
    },
    handleClick(tab, event) {
      if (this.activeName === "users" && this.users.length === 0)
        this.getData(this.activeName);
      if (this.activeName === "admins" && this.admins.length === 0)
        this.getData(this.activeName);
    },
    hanleReset(row, type) {
      var url = "";
      if (type) url = "/api/user/pwd/reset?userId=" + row.id;
      else url = "/api/admin/pwd/reset?adminId=" + row.id;
      console.log(row.id, type);
      this.pwdReset(url, type);
    },
    handleDelete(row, type) {
      var url = "";
      if (type) url = "/api/user/del?userId=" + row.id;
      else url = "/api/admin/del?adminId=" + row.id;
      this.userDel(url, type);
    },
    getData(value) {
      this.$http.get("/api" + "/admin/get/" + value).then(
        data => {
          if (!data.data.success) {
            this.$message.error(data.data.errMsg);
          } else {
            if (value === "users") this.users = data.data.data;
            else this.admins = data.data.data;
          }
        },
        err => {
          this.$message.error("获取数据失败!");
        }
      );
    },
    pwdReset(url, type) {
      this.$http.post(url).then(
        data => {
          if (!data.data.success) {
            this.$message.error(data.data.errMsg);
          } else {
            if (type) {
              this.$message.success("重置成功，密码为学生学号！");
            } else {
              this.$message.success("密码重置成功，密码为管理员账号！");
            }
          }
        },
        err => {
          this.$message.error("密码重置失败！");
        }
      );
    },
    userDel(url, type) {
      this.$http.post(url).then(
        data => {
          if (!data.data.success) {
            this.$message.error(data.data.errMsg);
          } else {
            //刷新数据
            if (type) {
              this.getData("users");
            } else {
              this.getData("admins");
            }
            this.$message.success("删除成功！");
          }
        },
        err => {
          this.$message.error("删除失败！");
        }
      );
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
