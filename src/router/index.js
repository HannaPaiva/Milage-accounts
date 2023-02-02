import { createRouter, createWebHistory } from "@ionic/vue-router";
import HomePage from "../views/HomePage.vue";

const routes = [
  {
    path: "/",
    redirect: "/user-account",
  },
  // -------------- teste CustomizedInput -----
  {
    path: "/testes",
    name: "testes",
    component: () => import("@/views/modules/pages/TesteCustomizedInput.vue"),
  },
  // -------------- teste CustomizedInput -----
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },

  {
    path: "/user-account",
    name: "User-account",
    component: () => import("@/views/modules/pages/0521_UserAccount.vue"),
  },

  {
    path: "/user-account-send-code",
    name: "Send-code",
    component: () =>
      import("@/views/modules/pages/0523A_UserAccountSendCode.vue"),
  },

  {
    path: "/user-account-send-code-success",
    name: "Send-code-success",
    component: () =>
      import("@/views/modules/pages/0523B_UserAccountSendCodeSuccess.vue"),
  },

  {
    path: "/user-account-info",
    name: "User-account-info",
    component: () => import("@/views/modules/pages/0522_UserAccountInfo.vue"),
  },
  {
    path: "/user-account-edit",
    name: "User-account-edit",
    component: () => import("@/views/modules/pages/0524_UserAccountEdit.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
