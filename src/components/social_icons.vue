<template>
  <div class="social-icons">
    <el-row :gutter="50" type="flex" justify="space-around">
      <el-tooltip
        class="tooltip"
        effect="dark"
        :content="urls.git"
        placement="bottom"
      >
        <el-col :span="6"
          ><el-link
            id="git"
            :href="urls.git"
            target="_blank"
            type="success"
            :underline="false"
            ><font-awesome-icon
              :icon="['fab', 'github-square']"
            ></font-awesome-icon></el-link
        ></el-col>
      </el-tooltip>
      <el-tooltip
        class="tooltip"
        effect="dark"
        :content="urls.linkedin"
        placement="bottom"
      >
        <el-col :span="6"
          ><el-link
            id="linkedin"
            :href="urls.linkedin"
            target="_blank"
            type="primary"
            :underline="false"
            ><font-awesome-icon
              :icon="['fab', 'linkedin']"
            ></font-awesome-icon></el-link
        ></el-col>
      </el-tooltip>
      <el-tooltip
        class="tooltip"
        effect="dark"
        :content="urls.portfolio"
        placement="bottom"
      >
        <el-col :span="6"
          ><el-link
            id="youtube"
            :href="urls.portfolio"
            target="_blank"
            type="danger"
            :underline="false"
            ><font-awesome-icon
              :icon="['fas', 'user-circle']"
            ></font-awesome-icon></el-link
        ></el-col>
      </el-tooltip>
      <el-tooltip
        class="tooltip"
        effect="dark"
        :content="urls.email"
        placement="bottom"
      >
        <el-col :span="6"
          ><el-link id="email" :href="urls.email" type="info" :underline="false"
            ><font-awesome-icon
              :icon="['fas', 'envelope']"
            ></font-awesome-icon></el-link
        ></el-col>
      </el-tooltip>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urls: {
        email: "mailto:yuxuan_li@mymail.sutd.edu.sg",
        git: "https://github.com/xmliszt",
        linkedin: "https://www.linkedin.com/in/li-yuxuan/",
        portfolio: "https://xmliszt.github.io/"
      }
    };
  }
};
</script>

<style scoped>
.social-icons {
  display: flex;
  justify-content: center;
}
.el-link {
  font-size: 1.5rem !important;
}
</style>
