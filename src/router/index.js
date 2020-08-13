import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Edit from "../views/Edit.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Verification from "../views/Verification.vue";
import Preview from "../views/Preview.vue";
import BasicTemplate from "@/templates/Basic.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/edit",
    name: "EditUser",
    component: Edit
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/verify",
    name: "Verification",
    component: Verification
  },
  {
    path: "/preview",
    name: "Preview",
    component: Preview,
    children: [
      {
        path: "basic",
        component: BasicTemplate
      }
    ]
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
