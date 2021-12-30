<template>
  <div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      @close="btn"
      @open="resetForm('ruleForm')"
      center
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldpass">
          <el-input
            type="password"
            v-model="ruleForm.oldpass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["type", "btn"],
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else {
        if (this.ruleForm.pass !== "") {
          this.$refs.ruleForm.validateField("pass");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入的新密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: this.type,
      ruleForm: {
        oldpass: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        oldpass: [{ validator: validateOldPass, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              "/api/admin/pwd/modify?old=" +
                this.ruleForm.oldpass +
                "&new=" +
                this.ruleForm.pass
            )
            .then(
              data => {
                if (!data.data.success) {
                  this.$message.error(data.data.errMsg);
                  this.resetForm(formName);
                } else {
                  this.$message.success("密码修改成功！");
                  this.resetForm(formName);
                  this.dialogFormVisible = false;
                }
              },
              err => {
                this.$message.error("密码修改失败!");
                this.resetForm(formName);
              }
            );
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  watch: {
    type(a, b) {
      //当父级传入的值发生改变的时候，修改对话框的状态
      this.dialogFormVisible = this.type;
    }
  }
};
</script>

<style></style>
