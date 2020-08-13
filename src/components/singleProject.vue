<template>
  <div style="margin-bottom: 20px">
    <el-card class="single-project" shadow="hover">
      <el-form
        ref="projectForm"
        :model="projectForm"
        :rules="rules"
        label-width="120px"
        label-position="left"
        status-icon
      >
        <el-form-item label="Project Title" prop="title">
          <el-input
            v-model="projectForm.title"
            placeholder="Your project title"
            maxlength="100"
            show-word-limit
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="desc">
          <el-input
            v-model="projectForm.desc"
            type="textarea"
            prop="desc"
            placeholder="One to two sentences about your project..."
            maxlength="150"
            :autosize="{ minRows: 2 }"
            clearable
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="deleteDisabled"
            type="warning"
            @click="updateProject"
            size="small"
            >Add</el-button
          >
          <div v-else>
            <el-button
              v-if="username"
              type="primary"
              @click="updateProject"
              size="small"
              >Update</el-button
            >
            <el-button type="danger" @click="deleteProject" size="small"
              >Delete</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { db } from "./../firebase";
export default {
  props: ["project", "fromArray", "userID"],
  data() {
    return {
      projectForm: {
        title: "",
        desc: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "Please input your project title!",
            trigger: "blur"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a short description about your project!",
            trigger: "blur"
          }
        ]
      },
      docID: "",
      btnDisabled: false,
      deleteDisabled: false,
      username: null
    };
  },
  created: function() {
    this.username = window.localStorage.getItem("user");
    if (this.$props.fromArray != undefined) {
      this.projectForm.title = this.$props.project.title;
      this.projectForm.desc = this.$props.project.desc;
      this.docID = this.$props.project.docID;
      if (!this.docID || this.docID == undefined) {
        this.deleteDisabled = true;
      } else {
        this.deleteDisabled = false;
      }
    }
  },
  methods: {
    updateProject() {
      var count = this.$store.getters.projectCount;
      if (count >= 8 && this.$props.project.title == undefined) {
        this.$notify.error(
          "Sorry! You have reached the limits (8) for project entries!"
        );
        return;
      }
      this.$refs.projectForm.validate(valid => {
        if (valid) {
          var project, projects;
          if (this.docID == undefined) {
            this.docID = makeid(11);
          }
          project = {
            docID: this.docID,
            title: this.projectForm.title,
            desc: this.projectForm.desc
          };
          if (window.localStorage.getItem("user")) {
            db.collection("resumes")
              .doc(this.$props.userID)
              .collection("resume")
              .doc("projects")
              .collection("projects")
              .doc(this.docID)
              .set(project);
            projects = this.$store.getters.projects;
            projects.forEach((project, idx) => {
              if (project.docID == this.docID) {
                projects.splice(idx, idx + 1);
              }
            });
          }
          projects = this.$store.getters.projects;
          projects.push(project);
          this.$store.commit("setProjects", projects);
          if (this.$props.project.title == undefined) {
            this.$refs.projectForm.resetFields();
            this.docID = undefined;
          }
          this.$notify.success("Entry updated!");
          this.$store.commit("addProjectCount");
        }
      });
    },
    deleteProject() {
      if (window.localStorage.getItem("user")) {
        db.collection("resumes")
          .doc(this.$props.userID)
          .collection("resume")
          .doc("projects")
          .collection("projects")
          .doc(this.docID)
          .delete();
      }
      var projects = this.$store.getters.projects;
      projects.forEach((project, idx) => {
        if (project.docID == this.docID) {
          projects.splice(idx, idx + 1);
        }
      });
      this.$notify.error("Entry deleted!");
      this.$store.commit("delProjectCount");
    }
  }
};

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.thumbnail-preview {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
