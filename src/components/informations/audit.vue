<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="公共信息" name="0">
        <el-row type="flex" justify="center">
          <el-col :span="22">
            <el-row v-for="info in infoList" :key="info.id">
              <router-link :to="'/detail/' + info.id">
                <el-card class="box-card" shadow="hover">
                  <el-col :span="12">
                    <span class="title">{{ info.title }}</span>
                  </el-col>
                  <el-col :span="12">
                    <span class="time ">
                      {{ info.gmtCreated | timeFormat("yyyy-MM-dd") }}
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
            <span style="display:block" class="null">暂无数据～</span>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="考试通知" name="1"
        ><el-row type="flex" justify="center">
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
            <span style="display:block" class="null">暂无数据～</span>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="学科竞赛" name="2">
        <el-row type="flex" justify="center">
          <el-col :span="22">
            <el-row v-for="info in infoList" :key="info.id">
              <router-link :to="'/detail/' + info.id">
                <el-card class="box-card" shadow="hover">
                  <el-col :span="12">
                    <span class="title">{{ info.title }}</span>
                  </el-col>
                  <el-col :span="12">
                    <span class="time ">
                      {{ info.gmtCreated | timeFormat("yyyy-MM-dd") }}
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
            <span style="display:block" class="null">暂无数据～</span>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="专项工作" name="3">
        <el-row type="flex" justify="center">
          <el-col :span="22">
            <el-row v-for="info in infoList" :key="info.id">
              <router-link :to="'/detail/' + info.id">
                <el-card class="box-card" shadow="hover">
                  <el-col :span="12">
                    <span class="title">{{ info.title }}</span>
                  </el-col>
                  <el-col :span="12">
                    <span class="time ">
                      {{ info.gmtCreated | timeFormat("yyyy-MM-dd") }}
                    </span>
                  </el-col>
                </el-card>
              </router-link>
            </el-row>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" v-if="infoList.length == 0">
          <el-col :span="12">
            <img src="../../assets/null.png" />
            <span style="display:block" class="null">暂无数据～</span>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import timeFormat from "../../utils/filter.js";
export default {
  mounted() {
    this.handleClick();
  },
  data() {
    return {
      activeName: "0",
      infoList: []
    };
  },
  methods: {
    handleClick() {
      this.$http.get("/api" + "/info/admin/audit?type=" + this.activeName).then(
        data => {
          if (!data.data.success) {
            this.$message.error(data.data.errMsg);
          } else {
            this.infoList = data.data.data;
          }
        },
        err => {
          this.$message.error("获取数据失败!");
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
  margin-top: -30px;
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
