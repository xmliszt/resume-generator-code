<template>
  <div class="template-selection box-shadow">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="(link, idx) in links" :key="link">
        <div class="carousel-content">
          <div
            style="margin: .5rem; position: absolute; font-size: 20px; font-weight: 600; z-index: 999;"
          >
            {{ names[idx] }}
          </div>
          <div
            style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; opacity: .7;"
          >
            <el-image :src="link" fit="cover"></el-image>
          </div>
          <div
            style="margin: 1rem; position: absolute; bottom: 5px; display: flex; justify-content: center; left: 25%; right: 25%;"
          >
            <el-button v-if="idx > 0" type="info" size="mini" plain disabled
              >Coming Soon</el-button
            >
            <el-button
              v-else
              type="primary"
              size="mini"
              plain
              @click="select(idx)"
              >Select Me</el-button
            >
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
// import generatePDF from "@/pdfGenerator.js";
import router from "./../router";
export default {
  props: ["profile", "educations", "experiences", "projects", "skills"],
  data() {
    return {
      links: [
        "https://i.ibb.co/MVJRD0p/basic-Template.jpg",
        "https://i.ibb.co/0DR0qvV/forest-Template.jpg"
      ],
      names: ["Basic", "Forest"],
      selected: ""
    };
  },
  methods: {
    async select(idx) {
      var confirm;
      if (!window.localStorage.getItem("user")) {
        confirm = await this.$confirm(
          "As a guest, your data will not be retrieved once leaving this page!",
          "Have you saved all your data?",
          {
            confirmButtonText: "Yes!",
            cancelButtonText: "Let me check again",
            type: "warning"
          }
        );
      } else {
        confirm = true;
      }

      if (confirm) {
        this.selected = this.names[idx];
        switch (this.selected) {
          case "Basic":
            router.push("/preview/basic");
            break;
        }
      }
    }
  }
};
</script>

<style scoped>
.template-selection {
  width: 100%;
  height: 100%;
  border: 1px solid #606266;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-carousel--horizontal {
  width: 100%;
  margin: 2rem;
}
.carousel-content {
  display: block;
  height: 100%;
  width: 100%;
}
@media (max-width: 768px) {
  .el-carousel--horizontal {
    width: 100%;
    margin: 1rem;
  }
}
</style>
