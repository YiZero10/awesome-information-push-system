<template>
  <div>
    <el-dialog
      title="添加管理员"
      :visible.sync="dialogFormVisible"
      @close="colseDialog('newAdmin')"
      center
    >
      <el-form
        :model="newAdmin"
        status-icon
        :rules="rules"
        ref="newAdmin"
        label-width="100px"
        class="demo-newAdmin"
        label-position="right"
      >
        <el-form-item label="账号" prop="jobId">
          <el-input v-model="newAdmin.jobId"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="newAdmin.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="department">
          <el-select v-model="newAdmin.department" placeholder="请选择部门">
            <el-option
              v-for="item in depts"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份" prop="type">
          <el-radio-group v-model.number="newAdmin.type">
            <el-radio :label="1">部门管理员</el-radio>
            <el-radio :label="2">普通管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('newAdmin')">
            添加
          </el-button>
          <el-button @click="resetForm('newAdmin')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["type", "btn", "getdata"],
  data() {
    return {
      dialogFormVisible: this.type,
      newAdmin: {
        jobId: "",
        password: "",
        department: "",
        type: ""
      },
      rules: {
        jobId: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        type: [{ required: true, message: "请选择身份", trigger: "change" }],
        department: [{ required: true, message: "请选择部门", trigger: "blur" }]
      },
      depts: [
        {
          value: "1",
          label: "教务处"
        },
        {
          value: "2",
          label: "团委"
        },
        {
          value: "3",
          label: "学生工作处"
        }
      ]
    };
  },
  methods: {
    colseDialog(fornName) {
      this.resetForm(fornName);
      this.btn();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("/api" + "/admin/add", {
              jobId: this.newAdmin.jobId,
              password: this.newAdmin.password,
              type: this.newAdmin.type,
              department: this.newAdmin.department
            })
            .then(
              data => {
                if (!data.data.success) {
                  this.$message.error(data.data.errMsg);
                } else {
                  this.$message.success("添加成功！");
                  this.getdata("admins");
                  this.dialogFormVisible = false;
                }
              },
              err => {
                this.$message.error("添加失败!");
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
