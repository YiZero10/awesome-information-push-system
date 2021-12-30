<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="22">
        <el-row v-for="info in infoList" :key="info.id">
          <router-link :to="'/detail/' + info.id">
            <el-card class="box-card" shadow="hover">
              <el-col :span="20">
                <span class="title">{{ info.title }}</span>
              </el-col>
              <el-col :span="4">
                <span class="time ">
                  {{ info.gmtCreated | timeFormat("yyyy-MM-dd") }}
                  <el-tag
                    size="mini"
                    v-if="$store.state.user.info.type <= 2"
                    :type="info.status === 0 ? 'primary' : 'danger'"
                  >
                    {{ info.status === 0 ? "审核通过" : "未通过" }}
                  </el-tag>
                </span>
              </el-col>
            </el-card>
          </router-link>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" v-if="infoList.length == 0">
      <el-col :span="12">
        <img src="../../assets/null.png" alt="" />
        <span style="display:block" class="null"
          >{{ this.$route.params.type | InfoType() }}类目中暂无数据～</span
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import timeFormat from "../../utils/filter.js";
import InfoType from "../../utils/filter.js";
import { log } from "util";
export default {
  data() {
    return {
      currentDate: new Date(),
      infoList: []
    };
  },
  methods: {
    getInfos() {
      var url =
        this.$store.state.user.info.type <= 2
          ? "/api/info/admins?type="
          : "/api/info/users?type=";
      var type = Number(this.$route.params.type);
      console.log(this.$route.params);
      this.$http.get(url + type).then(
        result => {
          if (!result.data.success) {
            this.$message.error(result.data.errMsg);
          } else {
            this.infoList = result.data.data;
            this.infoList.reverse();
          }
        },
        err => {
          this.$message.error("获取数据失败!");
        }
      );
    }
  },
  //监听路由
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "getInfos"
  },
  mounted() {
    this.getInfos();
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.title {
  font-size: 20px;
}
.text {
  font-size: 18px;
}
.null {
  font-size: 16px;
  color: #999;
  text-align: center;
  width: 400px;
  margin-top: -35px;
}
.time {
  font-size: 12px;
  color: #999;
  float: right;
  height: 28px;
  margin-top: 20px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.el-card__body {
  height: 30px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
