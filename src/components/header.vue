<template>
  <div class="header-section box-shadow">
    <div class="user-display" v-if="user != ''">
      <span>
        <el-link :underline="false" @click="goHome">
          <el-alert
            :title="user"
            type="success"
            :closable="false"
            style="width: auto;"
          ></el-alert>
        </el-link>
      </span>
    </div>

    <el-link :underline="false" @click="goHome"
      ><h1>Resume Generator</h1></el-link
    >
    <el-tooltip
      class="tooltip"
      effect="dark"
      :content="actionWords"
      placement="left"
      :disabled="false"
    >
      <div class="floating-action">
        <div v-if="user != ''">
          <el-link
            type="danger"
            icon="el-icon-delete"
            @click="signMeOut"
          ></el-link>
        </div>
        <div v-else>
          <el-button
            type="success"
            @click="toLogin"
            icon="el-icon-user"
            circle
          ></el-button>
        </div>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import { firebase } from "@firebase/app";
import router from "./../router";
export default {
  data() {
    return {
      actionWords: ""
    };
  },
  props: ["user"],
  created: function() {
    if (this.user == "") {
      this.actionWords = "Log in";
    } else {
      this.actionWords = "Log out";
    }
  },
  methods: {
    signMeOut() {
      firebase.auth().signOut();
      window.localStorage.removeItem("user");
      this.$notify.warning("You have been signed out!");
      this.$store.commit("setEducationCount", 0);
      this.$store.commit("setExperienceCount", 0);
      this.$store.commit("setProjectCount", 0);
      this.$store.commit("setSkillCount", 0);
      router.push("/");
    },
    toLogin() {
      router.push("/login");
    },
    goHome() {
      router.push("/");
    }
  },
  watch: {
    user: function(val) {
      if (val == "") {
        this.actionWords = "Log in";
      } else {
        this.actionWords = "Log out";
      }
    }
  }
};
</script>

<style scoped>
.floating-action {
  position: absolute;
  right: 30px;
  top: 30px;
}
.header-section {
  text-align: center;
  padding: 20px;
}
.user-display {
  position: absolute;
  left: 30px;
  top: 30px;
}
@media (max-width: 768px) {
  .user-display {
    position: relative;
    top: 15px;
    left: 0px;
    bottom: 15px;
  }
  .floating-action {
    top: 10px;
    right: 10px;
  }
}
</style>
