<template>
  <div>
    <el-container v-model="infoDetail">
      <el-container style="margin:15px 30px">
        <el-header class="header" style="height: 30px;">
          <el-page-header @back="goBack" content="信息详情"> </el-page-header>
        </el-header>
        <el-main style="padding:10px 30px">
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <div class="detail-title">{{ infoDetail.title }}</div>
              <div class="create-time">
                发布时间：{{ infoDetail.gmtCreated | timeFormat("yyyy-MM-dd") }}
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="24">
              <div
                class="content"
                v-html="infoDetail.content"
                style="white-space: pre-line;"
              ></div>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="center"
            style="margin-top:180px"
            v-if="$store.state.user.info.type < 2 && !fromPage"
          >
            <el-col :span="1">
              <el-button
                type="danger"
                icon="el-icon-delete"
                round
                @click="del(infoDetail.id)"
              >
                删除
              </el-button>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="center"
            style="margin-top:180px"
            v-if="fromPage"
          >
            <el-col :span="8">
              <el-button
                type="info"
                icon="el-icon-close"
                round
                @click="audit(false)"
              >
                不通过
              </el-button>
              <el-button
                type="primary"
                icon="el-icon-check"
                style="width:112.89px"
                round
                @click="audit(true)"
              >
                通过
              </el-button>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import timeFormat from "../../utils/filter.js";
export default {
  data() {
    return {
      infoDetail: {},
      fromPage: "",
      isPass: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //  这里的vm指的就是vue实例，可以用来当做this使用
      vm.fromPage = from.name === "audit" ? true : false;
    });
  },
  methods: {
    goBack() {
      this.$router.back(1);
    },
    getDetail() {
      var id = Number(this.$route.params.id);
      this.$http.get("/api" + "/info/detail?id=" + id).then(
        result => {
          if (!result.data.success) {
            this.$message.error(result.data.errMsg);
          } else {
            this.infoDetail = result.data.data;
          }
        },
        err => {
          this.$message.error("获取数据失败!");
        }
      );
    },
    audit(value) {
      var id = Number(this.$route.params.id);
      this.$http
        .post("/api" + "/info/audit?infoId=" + id + "&isPass=" + value)
        .then(
          data => {
            if (!data.data.success) {
              this.$message.error(data.data.errMsg);
            } else {
              this.$message.success("操作成功！");
              this.fromPage = false;
            }
          },
          err => {
            this.$message.error("操作失败!");
          }
        );
    },
    del(value) {
      var id = Number(value);
      this.$http.post("/api" + "/info/del?infoId=" + id).then(
        data => {
          if (!data.data.success) {
            this.$message.error(data.data.errMsg);
          } else {
            this.$message.success("删除成功！");
            this.goBack();
          }
        },
        err => {
          this.$message.error("删除失败!");
        }
      );
    }
  },
  mounted() {
    this.getDetail();
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.detail-title {
  font-size: 22px;
  text-align: center;
}
.el-page-header__left {
  color: #409eff;
}
.create-time {
  font-size: 14px;
  color: #999;
  text-align: center;
  margin-top: 10px;
}
.el-main {
  padding: 10px;
}
</style>
