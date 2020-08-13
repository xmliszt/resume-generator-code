<template>
  <div>
    <sideNav />
    <el-divider>Edit Your Profile</el-divider>
    <placeholder />
    <div class="edit">
      <placeholder />
      <div id="intro"></div>
      <el-divider>Basic</el-divider>
      <editProfile :userID="user" v-on:profileData="profileData" />
      <div id="edu"></div>
      <placeholder />
      <el-divider>Education</el-divider>
      <editEducation :userID="user" v-on:educationData="educationData" />
      <div id="exp"></div>
      <placeholder />
      <el-divider>Experience</el-divider>
      <editExperience :userID="user" v-on:experienceData="experienceData" />
      <div id="proj"></div>
      <placeholder />
      <el-divider>Projects</el-divider>
      <editProjects :userID="user" v-on:projectData="projectData" />
      <div id="skill"></div>
      <placeholder />
      <el-divider>Skills</el-divider>
      <editSkills :userID="user" v-on:skillData="skillData" />
      <hr />
      <div class="placeholder"></div>
      <div class="generate">
        <el-popover placement="top" trigger="click">
          <templateSelection />
          <el-button type="success" slot="reference" plain
            >SELECT YOUR TEMPLATES</el-button
          >
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import editProfile from "@/components/editProfile.vue";
import editEducation from "@/components/editEducation.vue";
import editExperience from "@/components/editExperience.vue";
import editProjects from "@/components/editProjects.vue";
import editSkills from "@/components/editSkill.vue";
import placeholder from "@/components/placeholder.vue";
import sideNav from "@/components/sidenav.vue";
import templateSelection from "@/components/templateSelection.vue";
import { makeid } from "./../utils/appUtil.js";
import { db } from "./../firebase";
export default {
  data() {
    return {
      user: "",
      profile: {},
      educations: [],
      experiences: [],
      projects: [],
      skills: [],
      showSelection: false
    };
  },
  components: {
    editProfile,
    editEducation,
    editExperience,
    editProjects,
    editSkills,
    placeholder,
    sideNav,
    templateSelection
  },
  created: function() {
    // fetch database data if have any, otherwise initialize one
    this.user = window.localStorage.getItem("user");
    this.$store.commit("setProfile", new Object());
    this.$store.commit("setEducations", [{ docID: undefined }]);
    this.$store.commit("setExperiences", [{ docID: undefined }]);
    this.$store.commit("setProjects", [{ docID: undefined }]);
    this.$store.commit("setSkills", [{ docID: undefined }]);
    if (this.user) {
      db.collection("resumes")
        .doc(this.user)
        .get()
        .then(async doc => {
          if (doc.exists) {
            console.log("exists");
            var profile = await db
              .collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("profile")
              .get();
            var educationsSnapshot = await db
              .collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("education")
              .collection("education")
              .get();
            var experiencesSnapshot = await db
              .collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("experience")
              .collection("experience")
              .get();
            var projectsSnapshot = await db
              .collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("projects")
              .collection("projects")
              .get();
            var skillsSnapshot = await db
              .collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("skills")
              .collection("skills")
              .get();
            var educations = this.$store.getters.educations;
            var experiences = this.$store.getters.experiences;
            var projects = this.$store.getters.projects;
            var skills = this.$store.getters.skills;
            educationsSnapshot.forEach(e => {
              if (e.data().docID) {
                educations.push(e.data());
              }
            });
            experiencesSnapshot.forEach(e => {
              if (e.data().docID) {
                experiences.push(e.data());
              }
            });
            projectsSnapshot.forEach(e => {
              if (e.data().docID) {
                projects.push(e.data());
              }
            });
            skillsSnapshot.forEach(e => {
              if (e.data().docID) {
                skills.push(e.data());
              }
            });
            this.$store.commit("setEducationCount", educations.length - 1);
            this.$store.commit("setExperienceCount", experiences.length - 1);
            this.$store.commit("setProjectCount", projects.length - 1);
            this.$store.commit("setSkillCount", skills.length - 1);
            this.$store.commit("setProfile", profile.data());
            this.$store.commit("setEducations", educations);
            this.$store.commit("setExperiences", experiences);
            this.$store.commit("setProjects", projects);
            this.$store.commit("setSkills", skills);
          } else {
            console.log("non exist!");
            db.collection("resumes")
              .doc(this.user)
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("profile")
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("education")
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("experience")
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("projects")
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("skills")
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("education")
              .collection("education")
              .doc(makeid(11))
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("experience")
              .collection("experience")
              .doc(makeid(11))
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("projects")
              .collection("projects")
              .doc(makeid(11))
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("skills")
              .collection("skills")
              .doc(makeid(11))
              .set({});
          }
        });
    }
  },
  methods: {
    profileData(value) {
      this.profile = value;
    },
    educationData(value) {
      this.educations = value.slice(1);
    },
    experienceData(value) {
      this.experiences = value.slice(1);
    },
    projectData(value) {
      this.projects = value.slice(1);
    },
    skillData(value) {
      this.skills = value.slice(1);
    },
    generateResume() {
      this.showSelection = true;
    }
  }
};
</script>

<style>
.tootip {
  margin: 4px;
}
.edit {
  margin-left: 20%;
  margin-right: 20%;
}
.el-textarea .el-input__count {
  opacity: 0.5;
}
.floating-home {
  position: fixed;
  left: 10px;
  top: 10px;
}
.generate {
  display: flex;
  justify-content: center;
}
@media (max-width: 768px) {
  .edit {
    margin-left: 30px;
    margin-right: 30px;
  }
}
</style>
