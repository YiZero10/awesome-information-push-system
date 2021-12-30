import Vue from "vue";
import resource from "vue-resource";
import store from "./store/index.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRichEditor from "vue-rich-editor";
import App from "./App.vue";
import router from "./router/router.js";
import { timeFormat, userType, Department, InfoType } from "./utils/filter.js";

Vue.use(resource);
Vue.use(ElementUI);
Vue.use(VueRichEditor);
Vue.filter("timeFormat", timeFormat);
Vue.filter("userType", userType);
Vue.filter("Department", Department);
Vue.filter("InfoType", InfoType);

if (localStorage.token) {
  //token设置到请求头
  Vue.http.headers.common["Authorization"] = localStorage.token;
} else {
  location.href = "./login.html";
}
new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
