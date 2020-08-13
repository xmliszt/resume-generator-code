<template>
  <div class="edit-profile">
    <el-form
      ref="profileForm"
      :model="profileForm"
      :rules="rules"
      label-width="120px"
      label-position="left"
      status-icon
    >
      <el-form-item label="Name" prop="en_name">
        <el-input
          v-model="profileForm.en_name"
          placeholder="English display name here"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Email address" prop="email">
        <el-input
          v-model="profileForm.email"
          placeholder="Your email address"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Tagline/Intro" prop="subtitle">
        <el-input
          type="textarea"
          v-model="profileForm.subtitle"
          placeholder="A short description or tagline about yourself..."
          maxlength="200"
          clearable
          :autosize="{ minRows: 2 }"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="Website" prop="website">
        <el-input
          v-model="profileForm.website"
          placeholder="Your personal website link"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Github" prop="git">
        <el-input
          v-model="profileForm.git"
          placeholder="Your Github link"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Linkedin" prop="linkedin">
        <el-input
          v-model="profileForm.linkedin"
          placeholder="Your LinkedIn link"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="YouTube" prop="youtube">
        <el-input
          v-model="profileForm.youtube"
          placeholder="Your YouTube channel link"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateProfile">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { db } from "./../firebase";
export default {
  data() {
    return {
      profileForm: {
        en_name: "",
        email: "",
        subtitle: "",
        website: "",
        git: "",
        youtube: "",
        linkedin: ""
      },
      rules: {
        en_name: [
          {
            required: true,
            message: "Please input your name in English",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Please input your email address",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"]
          }
        ],
        subtitle: [
          {
            required: true,
            message: "Please input some short description about yourself",
            trigger: "blur"
          }
        ],
        website: [
          {
            type: "url",
            message: "Please input valid URL",
            trigger: ["blur", "change"]
          }
        ],
        git: [
          {
            type: "url",
            message: "Please input valid URL",
            trigger: ["blur", "change"]
          }
        ],
        linkedin: [
          {
            type: "url",
            message: "Please input valid URL",
            trigger: ["blur", "change"]
          }
        ],
        youtube: [
          {
            type: "url",
            message: "Please input valid URL",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  props: ["userID"],
  created: async function() {
    if (window.localStorage.getItem("user")) {
      await db
        .collection("resumes")
        .doc(this.$props.userID)
        .collection("resume")
        .doc("profile")
        .get()
        .then(doc => {
          var profile = doc.data();
          if (profile) {
            this.profileForm.en_name = profile.name;
            this.profileForm.subtitle = profile.subtitle;
            this.profileForm.website = profile.website;
            this.profileForm.email = profile.email;
            this.profileForm.git = profile.git;
            this.profileForm.linkedin = profile.linkedin;
            this.profileForm.youtube = profile.youtube;
          }
        });
    }
    this.$emit("profileData", {
      name: this.profileForm.en_name,
      subtitle: this.profileForm.subtitle,
      website: this.profileForm.website ? this.profileForm.website : "",
      email: this.profileForm.email,
      git: this.profileForm.git ? this.profileForm.git : "",
      linkedin: this.profileForm.linkedin ? this.profileForm.linkedin : "",
      youtube: this.profileForm.youtube ? this.profileForm.youtube : ""
    });
  },
  methods: {
    updateProfile() {
      this.$refs.profileForm.validate(valid => {
        if (valid) {
          var profile;
          profile = {
            name: this.profileForm.en_name,
            subtitle: this.profileForm.subtitle,
            website: this.profileForm.website ? this.profileForm.website : "",
            email: this.profileForm.email,
            git: this.profileForm.git ? this.profileForm.git : "",
            linkedin: this.profileForm.linkedin
              ? this.profileForm.linkedin
              : "",
            youtube: this.profileForm.youtube ? this.profileForm.youtube : ""
          };
          if (window.localStorage.getItem("user")) {
            // upload to firebase
            db.collection("resumes")
              .doc(this.$props.userID)
              .collection("resume")
              .doc("profile")
              .set(profile);
          }
          this.$store.commit("setProfile", profile);
          this.$emit("profileData", profile);
          this.$notify.success("Entry updated!");
        }
      });
    }
  }
};
</script>
