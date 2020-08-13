<template>
  <div class="footer-section">
    <el-divider><i class="el-icon-star-on"></i></el-divider>
    <socialIcons />
    <div class="copyright-text" style="margin-bottom: 15px; margin-top: 30px;">
      <a
        href="https://xmliszt.github.io/"
        style="text-decoration: none; color: #606266"
        target="_blank"
        ><b> Li Yuxuan </b></a
      >
      <font-awesome-icon :icon="['fas', 'copyright']"></font-awesome-icon>
      2020
    </div>
    <div class="copyright-text">
      <b
        >This is a
        <el-link
          type="primary"
          :href="vueLink"
          target="_blank"
          :underline="false"
          >Vue.js</el-link
        >
        project</b
      >
    </div>
    <div class="copyright-text">
      <span>Site hosting on </span
      ><el-link
        type="primary"
        :href="gitPageLink"
        target="_blank"
        :underline="false"
        >GitHub Pages</el-link
      >
    </div>
    <div class="copyright-text">
      <span>Database hosted by </span
      ><el-link
        type="primary"
        :href="firebaseLink"
        target="_blank"
        :underline="false"
        >Google Firebase</el-link
      >
    </div>
    <div class="copyright-text">
      <span>UI framework using </span
      ><el-link
        type="primary"
        :href="elementUILink"
        target="_blank"
        :underline="false"
        >Element.io</el-link
      >
    </div>
    <div class="copyright-text">
      <span>Icons using </span
      ><el-link
        type="primary"
        :href="fontawesomeLink"
        target="_blank"
        :underline="false"
        >FontAwesome</el-link
      >
    </div>
    <div class="copyright-text">
      <span>Favicon made by </span
      ><el-link
        type="primary"
        :href="faviconLink"
        target="_blank"
        :underline="false"
        >Favicon.io</el-link
      >
    </div>
    <div style="margin-top: 30px;"></div>
  </div>
</template>
<script>
import socialIcons from "@/components/social_icons.vue";
export default {
  data() {
    return {
      gitPageLink: "https://pages.github.com/",
      vueLink: "https://vuejs.org/",
      fontawesomeLink: "https://fontawesome.com/",
      elementUILink: "https://element.eleme.io/",
      faviconLink: "https://favicon.io/",
      firebaseLink: "https://firebase.google.com/"
    };
  },
  components: {
    socialIcons
  }
};
</script>

<style scoped>
.footer-section {
  text-align: center;
}
.copyright-text {
  font-size: 12px;
  color: #525252;
}
</style>
