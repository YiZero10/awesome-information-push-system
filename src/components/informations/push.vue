<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input
        type="textarea"
        :autosize="{ minRows: 10 }"
        v-model="ruleForm.content"
        placeholder="请输入内容"
      ></el-input>
    </el-form-item>
    <el-form-item label="类别" prop="type">
      <el-select v-model="ruleForm.type" placeholder="请选择类别">
        <el-option
          v-for="item in types"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      label="推送范围"
      prop="visibleRange"
      v-if="ruleForm.type != 0"
    >
      <el-radio-group v-model.number="ruleForm.visibleRange">
        <el-radio :label="0">全局</el-radio>
        <el-radio :label="1">指定专业</el-radio>
        <el-radio :label="2">指定学号</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      label="专业"
      prop="objects"
      v-if="ruleForm.type != 0 && ruleForm.visibleRange == 1"
    >
      <el-select
        v-model="ruleForm.objects"
        placeholder="请选择专业(可多选)"
        multiple
        clearable
      >
        <el-option
          v-for="item in classIds"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      label="学号"
      prop="objects"
      v-if="ruleForm.type != 0 && ruleForm.visibleRange == 2"
    >
      <el-select
        v-model="ruleForm.objects"
        placeholder="请选择学号(可多选)"
        multiple
        clearable
      >
        <el-option
          v-for="item in studentIds"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="发布时间" prop="releaseTime">
      <el-col :span="11">
        <el-date-picker
          v-model="ruleForm.releaseTime"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">
        立即创建
      </el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Config from "../../config.js";
export default {
  data() {
    return {
      types: [
        {
          value: "0",
          label: "公共信息"
        },
        {
          value: "1",
          label: "考试通知"
        },
        {
          value: "2",
          label: "学科竞赛"
        },
        {
          value: "3",
          label: "专项工作"
        }
      ],
      classIds: [],
      studentIds: [],
      ruleForm: {
        title: "",
        content: "",
        type: "",
        visibleRange: 0,
        releaseTime: "",
        objects: []
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        type: [{ required: true, message: "请选择类别", trigger: "change" }],
        releaseTime: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        content: [{ required: true, message: "请填写内容", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formtitle) {
      this.$refs[formtitle].validate(valid => {
        let information = {
          title: this.ruleForm.title,
          coverImg: "",
          type: this.ruleForm.type,
          visibleRange: this.ruleForm.visibleRange,
          releaseTime: this.ruleForm.releaseTime,
          content: this.ruleForm.content.replace(/\n|\r\n/g, "<br>")
        };
        if (valid) {
          console.log(information);
          this.$http
            .post("/api" + "/info/add", {
              information: information,
              objects: this.ruleForm.objects
            })
            .then(
              data => {
                if (!data.data.success) {
                  this.$message.error(data.data.errMsg);
                } else {
                  this.$message.success("添加成功！");
                  this.resetForm("ruleForm");
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
    resetForm(formtitle) {
      this.$refs[formtitle].resetFields();
    },
    getAllIds() {
      this.$http.get("/api" + "/all/ids").then(
        result => {
          if (!result.data.success) {
            this.$message.error(result.data.errMsg);
          } else {
            this.classIds = result.data.data.classIds;
            this.studentIds = result.data.data.studentIds;
          }
        },
        err => {
          this.$message.error("获取数据失败!");
        }
      );
    }
  },
  mounted() {
    this.getAllIds();
  }
};
</script>

<style>
.ve-container {
  position: relative;
  width: calc(100% - 40px);
  margin: 0 auto;
}
.ve-button-area {
  margin: 10px 0 0 0;
}
.ve-button {
  padding: 4px 10px;
  background: #00a3cf;
  border: 0;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
}
</style>
