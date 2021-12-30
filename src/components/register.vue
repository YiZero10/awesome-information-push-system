<template>
  <div>
    <el-dialog
      title="注册"
      :visible.sync="centerDialogVisible"
      center
      @close="colseDialog('registerUser')"
      width="600px"
    >
      <el-form
        :model="registerUser"
        status-icon
        :rules="rules"
        ref="registerUser"
        label-width="100px"
        class="demo-registerUser"
        label-position="right"
      >
        <el-form-item label="手机号" prop="tel">
          <el-input v-model="registerUser.tel"></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="registerUser.name"
            placeholder="请输入您的姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="type">
          <el-radio-group v-model.number="registerUser.type">
            <el-radio :label="3">学生</el-radio>
            <el-radio :label="4">家长</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学号" prop="studentId">
          <el-input
            v-model="registerUser.studentId"
            autocomplete="off"
            placeholder="请输入您/孩子的学号"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="专业" prop="classId">
          <el-select
            v-model="registerUser.classId"
            placeholder="请选择您/孩子的专业"
          >
            <el-option
              v-for="item in majors"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="registerUser.password"
            autocomplete="off"
            placeholder="设置您的密码"
          >
          </el-input>
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="5">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
          </el-col>
          <el-col :span="5">
            <el-button type="primary" @click="submitForm('registerUser')">
              立即注册
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["type", "btn"],
  data() {
    return {
      centerDialogVisible: this.type,
      majors: ["计算机科学与技术", "信息安全", "软件工程"],
      registerUser: {
        tel: "",
        password: "",
        name: "",
        type: "",
        studentId: "",
        classId: ""
      },
      rules: {
        tel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        type: [{ required: true, message: "请选择身份", trigger: "change" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        studentId: [{ required: true, message: "请输入学号", trigger: "blur" }],
        classId: [{ required: true, message: "请选择专业", trigger: "blur" }]
      }
    };
  },
  methods: {
    colseDialog(formName) {
      this.resetForm(formName);
      this.btn();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("/api" + "/register", {
              tel: this.registerUser.tel,
              password: this.registerUser.password,
              name: this.registerUser.name,
              type: this.registerUser.type,
              studentId: this.registerUser.studentId,
              classId: this.registerUser.classId
            })
            .then(
              data => {
                if (!data.data.success) {
                  this.$message.error(data.data.errMsg);
                  this.resetForm("registerUser");
                } else {
                  this.$message.success("注册成功！快去登录吧！");
                  this.colseDialog("registerUser");
                }
              },
              err => {
                this.$message.error("注册失败!");
              }
            );
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    type(a, b) {
      //当父级传入的值发生改变的时候，修改对话框的状态
      this.centerDialogVisible = this.type;
    }
  }
};
</script>

<style></style>
