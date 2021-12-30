import Vue from "vue";
import Router from "vue-router";
import index from "../components/index.vue";
import manage from "../components/manage/manage.vue";
import infolist from "../components/informations/infolist.vue";
import push from "../components/informations/push.vue";
import detail from "../components/informations/detail.vue";
import register from "../components/register.vue";
import audit from "../components/informations/audit.vue";

Vue.use(Router);

const routes = [
  { path: "/", name: "index", component: index },
  { path: "/info", name: "index", component: index },
  { path: "/register", name: "register", component: register },
  { path: "/manage", name: "manage", component: manage },
  { path: "/infos/:type", name: "infos", component: infolist },
  { path: "/detail/:id", name: "detail", component: detail },
  { path: "/push", name: "push", component: push },
  { path: "/audit", name: "audit", component: audit }
];
export default new Router({
  routes
});
