<template>
  <div style="width:500px;margin:150px auto">
    <div style="margin: 30px auto">
      <img src="./assets/logo.png" style="height: 45px; width: 513px" />
    </div>
    <el-row type="flex" justify="center">
      <el-form
        :model="signInModel"
        :rules="rules"
        ref="signInModel"
        label-width="70px"
        class="demo-signInModel"
        style="width:-webkit-fill-available;margin:0 auto"
      >
        <el-form-item label="账号" prop="userId">
          <el-input v-model="signInModel.userId"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="signInModel.password" show-password></el-input>
        </el-form-item>
        <el-form-item class="type" label="身份" prop="permission">
          <el-radio-group v-model.number="signInModel.permission">
            <el-radio :label="3" :isCheck="true">学生</el-radio>
            <el-radio :label="4">家长</el-radio>
            <el-radio :label="0">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row type="flex" justify="end">
          <el-col :span="7">
            <el-button type="text" @click="handleClick()">
              还没有账号？立即注册！
            </el-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top:16px">
          <el-col :span="12" style="text-align:center">
            <el-button
              type="primary"
              @click="submitForm('signInModel')"
              style="width:300px;height:43px;font-size:16px"
            >
              立即登录
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <register :type="type" :btn="btn"></register>
  </div>
</template>

<script>
import { http, login, getInfo } from "./api/api.js";
import { log } from "util";
import { get } from "http";
import register from "./components/register.vue";

export default {
  data() {
    return {
      type: false,
      signInModel: {
        userId: "",
        password: "",
        permission: ""
      },
      rules: {
        userId: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        permission: [
          { required: true, message: "请选择身份", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    handleClick() {
      this.type = true;
    },
    btn() {
      //关闭对话框的改变状态
      this.type = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("/api" + login, {
              userId: this.signInModel.userId,
              password: this.signInModel.password,
              permission: this.signInModel.permission
            })
            .then(
              data => {
                if (!data.data.success) {
                  this.$message.error(data.data.errMsg);
                  this.resetForm("signInModel");
                } else {
                  localStorage.token = data.data.data;
                  this.$message.success("登录成功!");
                }
              },
              err => {
                this.$message.error("登录失败!");
                this.resetForm("signInModel");
              }
            )
            .then(data => {
              this.$http
                .get("/api" + "/getInfo?pms=" + this.signInModel.permission)
                .then(
                  data => {
                    if (!data.data.success) {
                      this.$message.error(data.data.errMsg);
                    } else {
                      this.$store.commit("setInfo", data.data.data);
                      localStorage.setItem(
                        "info",
                        JSON.stringify(data.data.data)
                      );
                      location.href = "/";
                    }
                  },
                  err => {
                    this.$message.error("获取用户数据失败!");
                  }
                );
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  components: { register }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.type {
  margin-bottom: 0px;
}
</style>
