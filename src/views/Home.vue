<template>
  <div class="home">
    <el-carousel height="40vw">
      <el-carousel-item v-for="img in banner" :key="img">
        <el-image
          :src="img"
          style="width: 100%; height: 40vw"
          fit="cover"
          alt="Banner Picture"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
    <div class="placeholder"></div>
    <el-collapse v-model="activeName" style="text-align: justify;" accordion>
      <el-collapse-item title="Features" name="1">
        <div>
          Resume Generator is completely free and easy to use. Click on
          <el-link type="success" size="mini" plain @click="getStarted" disabled
            >GET STARTED</el-link
          >
          below to get started. Fill up your information in the form
          <b>[Basic, Education, Expeirence, Projects, Skills]</b> and click
          <el-link type="success" size="mini" disabled plain>GENERATE</el-link>
          to get your resume downloaded as PDF on your device! To stop editing
          your profile half-way before generating a PDF, you can use the
          <el-link type="primary" size="mini" disabled>
            UPDATE
          </el-link>
          and <el-link type="primary" size="mini" disabled>SAVE</el-link> to
          save your changes and come back again next time to continue editing.
          You can also use
          <el-link type="danger" size="mini" disabled>DELETE</el-link> to delete
          an entry if you don't need it anymore. To create new entry, simply
          fill in the card first and then click
          <el-link type="warning" size="mini" disabled>ADD</el-link> to add a
          new entry.
        </div>
      </el-collapse-item>
      <el-collapse-item title="Guest v.s. Account User" name="2">
        <div>
          We encourage you to sign up as an account user with Google! As a
          guest, we will not help you save your data so next time you have to
          re-enter your information to try our services.
        </div>
        <div>
          As an account user, your data will be safely stored in Google database
          using Google authentication methods. Your latest information will be
          restored to the form automatically the next time you open the editor
          page! If you don't have an account yet, click here
          <el-button style="primary" size="mini" @click="signMeUp"
            >Sign Up</el-button
          >
          to sign up now!
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="placeholder"></div>
    <div style="text-align: center;">
      <el-button type="success" size="medium" @click="getStarted" plain
        >GET STARTED</el-button
      >
    </div>
  </div>
</template>

<script>
import router from "./../router";
export default {
  name: "Home",
  data() {
    return {
      activeName: "1",
      banner: [
        "https://i.ibb.co/0GtBmt9/banner-1-Artboard-1.jpg",
        "https://i.ibb.co/dJK9cQK/banner-2-Artboard-1.jpg",
        "https://i.ibb.co/QkGGXgr/banner-3-Artboard-1.jpg"
      ]
    };
  },
  methods: {
    getStarted() {
      if (
        window.localStorage.getItem("user") == "" ||
        window.localStorage.getItem("user") == undefined
      ) {
        this.$notify.warning({
          title: "You are not logged in!",
          duration: 0,
          message:
            "As Guest, your progress and data will not be saved and you cannot make updates to your entries once they are created!"
        });
        setTimeout(() => {
          this.$notify.error({
            title: "Do not refresh the page!",
            duration: 0,
            message:
              "As Guest, refreshing the page will cause you lose all your data! Use the on-site navigation instead of refreshing the page to navigate!"
          });
        }, 3000);
      }
      router.push(`/edit`);
    },
    signMeUp() {
      router.push("/signup");
    }
  }
};
</script>

<style>
.placeholder {
  margin-top: 30px;
  margin-bottom: 30px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-collapse-item__wrap {
  padding: 15px;
}

.el-collapse-item__header {
  padding-left: 15px;
  font-weight: 600;
}
</style>
