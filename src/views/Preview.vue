<template>
  <div style="text-align: center;">
    <div class="preview" v-loading="loading">
      <div class="placeholder"></div>
      <div class="preview-view hover-box-shadow">
        <img
          id="preview"
          width="100%"
          style="object-fit: cover;"
          alt="Resume Preview"
        />
      </div>
      <div id="preview-template" class="preview-template">
        <router-view
          :profile="profile"
          :educations="educations"
          :experiences="experiences"
          :projects="projects"
          :skills="skills"
        ></router-view>
      </div>
      <div class="placeholder"></div>
      <el-button id="downloadBtn" type="primary" @click="downloadPDF" plain
        >DOWNLOAD AS PDF</el-button
      >
    </div>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      profile: {},
      educations: [],
      experiences: [],
      projects: [],
      skills: [],
      doc: null,
      loading: false
    };
  },
  created() {
    this.loading = true;
    this.profile = this.$store.getters.profile;
    this.educations = this.$store.getters.educations.slice(1);
    this.experiences = this.$store.getters.experiences.slice(1);
    this.projects = this.$store.getters.projects.slice(1);
    this.skills = this.$store.getters.skills.slice(1);

    setTimeout(() => {
      var preview = document.getElementById("preview-template");
      var previewDisplay = document.getElementById("preview");
      preview.style.width = 793.7;
      preview.style.height = 1122.5;
      html2canvas(preview, {
        scale: 2
      }).then(canvas => {
        var img = canvas.toDataURL("image/png");
        var imgWidth = 210;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        this.doc = new jsPDF("p", "mm", "a4");
        var position = 0;
        preview.setAttribute("style", "display: none;");
        previewDisplay.src = img;
        this.doc.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
        this.loading = false;
      });
    }, 2000);
  },
  methods: {
    downloadPDF() {
      this.$confirm(`Download your resume now?`)
        .then(() => {
          this.doc.save("test.pdf");
        })
        .catch(err => {
          console.log(err);
          console.log("User cancel download PDF.");
        });
    }
  }
};
</script>

<style>
.preview {
  display: inline-block;
  font-family: "Times", "Arial";
  text-align: center;
  width: 90%;
  min-height: 127.26%;
}

.preview-template {
  width: 794px;
  min-height: 1123px;
}
</style>
