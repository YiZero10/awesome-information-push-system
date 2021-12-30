import Vue from "vue";
import ElementUI from "element-ui";
import resource from "vue-resource";
import store from "./store/index.js";
import "element-ui/lib/theme-chalk/index.css";
import login from "./login.vue";

Vue.use(ElementUI);
Vue.use(resource);

new Vue({
  el: "#app",
  store,
  render: h => h(login)
});
Vue.http.interceptors.push((request, next) => {
  if (localStorage.token) {
    request.headers.set("Authorization", localStorage.token);
  }
});
