<template>
  <div id="app" ref="app">
    <HeaderSection :user="activeUser" />
    <router-view />
    <FooterSection />
    <div class="placeholder">
      <iframe id="canvas_handler" style="opacity: 0;" />
    </div>
  </div>
</template>
<script>
import HeaderSection from "@/components/header.vue";
import FooterSection from "@/components/footer.vue";
import { firebase } from "@firebase/app";

export default {
  name: "app",
  components: {
    HeaderSection,
    FooterSection
  },
  data() {
    return {
      activeUser: ""
    };
  },
  mounted: async function() {
    firebase.auth().onAuthStateChanged(this.activeUserListener);
  },
  methods: {
    activeUserListener: function(user) {
      // console.log(user);
      if (user) {
        if (user.emailVerified) {
          this.activeUser = user.email;
          window.localStorage.setItem("user", user.uid);
        }
      } else {
        this.activeUser = "";
        window.localStorage.removeItem("user");
      }
    }
  }
};
</script>
<style>
html {
  scroll-behavior: smooth;
}
.el-message-box {
  width: 100% !important;
}
.el-popover {
  width: 80%;
  height: 60%;
}
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(20px);
  opacity: 0;
}
.el-collapse-item__header {
  font-weight: 700 !important;
}
.el-notification__title,
.el-notification__content,
.el-message-box__content {
  font-family: "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif !important;
}
.el-tooltip__popper.is-dark {
  font-family: "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif !important;
}
textarea {
  font-family: "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif !important;
}
#app {
  font-size: 14px;
  font-family: "Helvetica Neue", "Hiragino Sans GB", "Microsoft YaHei",
    Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.line-break {
  margin-top: 6px;
  margin-bottom: 6px;
}

.box-shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.hover-box-shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0), 0 0 6px rgba(0, 0, 0, 0);
  transition: box-shadow 0.5s;
}

.hover-box-shadow:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.24), 0 0 6px rgba(0, 0, 0, 0.1);
}

.el-form-item__error {
  text-align: start;
  position: relative !important;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  opacity: 0.3;
  transition: opacity 1s;
}

::-webkit-scrollbar-thumb {
  background-color: #409eff;
  border-radius: 5px;
}

::-webkit-scrollbar:hover {
  opacity: 1;
}

@media (max-width: 768px) {
  .el-form-item__label {
    width: 100px !important;
  }
  .el-form-item__content {
    margin-left: 100px !important;
  }
  .el-notification {
    width: 200px !important;
  }
}
</style>
