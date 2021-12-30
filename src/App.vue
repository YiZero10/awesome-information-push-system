<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <div>
          <img
            src="./assets/logo.png"
            style="
            height: 45px;
            width: 513px;
          padding-top: 16px;
          padding-left: 30px;
          "
          />
        </div>
      </el-header>
      <el-divider></el-divider>
      <el-container>
        <el-aside width="250px" style="width: 250px;">
          <el-menu
            default-active="info"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            v-if="$store.state.menu.menu && $store.state.user.info"
            router
          >
            <el-menu-item index="/info" v-show="$store.state.menu.menu[0]">
              <i class="el-icon-user"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
            <el-submenu index="22" v-show="$store.state.menu.menu[1]">
              <template slot="title">
                <i class="el-icon-chat-dot-round"></i>
                <span>消息中心</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/infos/1">考试通知</el-menu-item>
                <el-menu-item index="/infos/2">学科竞赛</el-menu-item>
                <el-menu-item index="/infos/3">专项工作</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/infos/0" v-show="$store.state.menu.menu[2]">
              <i class="el-icon-document"></i>
              <span slot="title">公共信息</span>
            </el-menu-item>
            <el-menu-item index="/push" v-show="$store.state.menu.menu[3]">
              <i class="el-icon-edit"></i>
              <span slot="title">发布信息</span>
            </el-menu-item>
            <el-menu-item index="/audit" v-show="$store.state.menu.menu[3]">
              <i class="el-icon-finished"></i>
              <span slot="title">审核信息</span>
            </el-menu-item>
            <el-menu-item index="/manage" v-show="$store.state.menu.menu[4]">
              <i class="el-icon-setting"></i>
              <span slot="title">人员管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main v-if="$store.state.user.info" style=" padding: 15px;">
          <router-view> </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      loading: true,
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.getMenus();
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    getMenus() {
      if (this.$store.state.user.info) {
        var permission = this.$store.state.user.info.type;
        //修改导航状态树
        this.$store.commit("setmenu", permission);
      } else if (JSON.parse(localStorage.getItem("info"))) {
        this.$store.commit("setInfo", JSON.parse(localStorage.getItem("info")));
        localStorage.removeItem("info");
        var permission = this.$store.state.user.info.type;
        //修改导航状态树
        this.$store.commit("setmenu", permission);
      } else {
        location.href = "/login.html";
      }
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.el-menu-vertical-demo {
  min-height: 675px;
}
.el-divider--horizontal {
  margin: 17px 0 0 0;
}
.el-menu-vertical-demo {
  padding: 5px 0px;
}
.is-vertical {
  margin: 0 100px;
}
</style>
