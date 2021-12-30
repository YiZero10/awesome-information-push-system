<template>
  <div>
    <el-row type="flex" class="row-bg">
      <el-col :span="24">
        <div class="" style="margin-top:8px">
          <el-descriptions
            title="用户信息"
            class="margin-top"
            v-if="$store.state.user.info.type <= 2"
            border
          >
            <el-descriptions-item label="ID">{{
              $store.state.user.info.id
            }}</el-descriptions-item>
            <el-descriptions-item label="账号">
              {{ $store.state.user.info.jobId }}</el-descriptions-item
            >
            <el-descriptions-item label="部门">{{
              $store.state.user.info.department | Department
            }}</el-descriptions-item>
            <el-descriptions-item label="身份">
              <el-tag size="small">{{
                $store.state.user.info.type | userType
              }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">
              {{
                $store.state.user.info.gmtCreated
                  | timeFormat("yyyy-MM-dd HH:mm:ss")
              }}</el-descriptions-item
            >
          </el-descriptions>
          <el-descriptions title="用户信息" v-else border>
            <el-descriptions-item label="姓名">{{
              $store.state.user.info.name
            }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{
              $store.state.user.info.tel
            }}</el-descriptions-item>
            <el-descriptions-item label="身份">
              <el-tag size="small">{{
                $store.state.user.info.type | userType
              }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$store.state.user.info.type === 3 ? '学号' : '孩子学号'"
              >{{ $store.state.user.info.studentId }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$store.state.user.info.type === 3 ? '专业' : '孩子专业'"
            >
              {{ $store.state.user.info.classId }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <div class="">
          <el-button type="primary" round @click="type = true">
            修改密码
          </el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="">
          <el-button type="danger" round @click="logout">退出登录</el-button>
        </div>
      </el-col>
    </el-row>
    <setpwd :type="type" :btn="btn"></setpwd>
  </div>
</template>

<script>
import setpwd from "./setpwd.vue";
export default {
  data() {
    return {
      type: false
    };
  },
  methods: {
    btn() {
      //关闭对话框的改变状态
      this.type = false;
    },
    logout() {
      localStorage.clear();
      location.href = "./login.html";
    }
  },
  components: { setpwd }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
</style>
