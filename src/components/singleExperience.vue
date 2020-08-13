<template>
  <div style="margin-bottom: 20px">
    <el-card class="single-experience" shadow="hover">
      <el-form
        ref="experienceForm"
        :model="experienceForm"
        :rules="rules"
        label-width="120px"
        label-position="left"
        status-icon
      >
        <el-form-item label="Company/Org" prop="title">
          <el-input
            v-model="experienceForm.title"
            placeholder="Your company/organization name"
            maxlength="80"
            show-word-limit
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="Position" prop="position">
          <el-input
            v-model="experienceForm.position"
            placeholder="Your position"
            maxlength="80"
            show-word-limit
            clearable
          ></el-input>
        </el-form-item>
        <div class="location-container">
          <el-form-item label="Location" prop="city">
            <el-input
              v-model="experienceForm.city"
              placeholder="city"
              maxlength="50"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label=" " prop="country" label-width="20px">
            <el-input
              v-model="experienceForm.country"
              placeholder="country"
              maxlength="30"
              clearable
            ></el-input>
          </el-form-item>
        </div>

        <div class="date-container">
          <el-form-item label="From Date" prop="fromDate">
            <el-date-picker
              v-model="experienceForm.fromDate"
              type="month"
              placeholder="Starting date"
              size="small"
              format="MMM yyyy"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="To Date" prop="toDate" label-width="70px">
            <el-date-picker
              :disabled="disabled"
              v-model="experienceForm.toDate"
              type="month"
              placeholder="Ending date"
              size="small"
              format="MMM yyyy"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="Present?" prop="present">
            <el-switch v-model="experienceForm.present"></el-switch>
          </el-form-item>
        </div>
        <el-form-item label="Description" prop="content">
          <el-input
            v-model="experienceForm.content"
            type="textarea"
            prop="content"
            placeholder="Briefly explain what you did..."
            maxlength="300"
            :autosize="{ minRows: 2 }"
            clearable
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="deleteDisabled"
            type="warning"
            @click="updateExperience"
            size="small"
            >Add</el-button
          >
          <div v-else>
            <el-button
              v-if="username"
              type="primary"
              @click="updateExperience"
              size="small"
              >Update</el-button
            >
            <el-button type="danger" @click="deleteExperience" size="small"
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
  props: ["experience", "fromArray", "userID"],
  data() {
    var validateFromDate = (rule, value, callback) => {
      if (new Date(value) > new Date(this.experienceForm.toDate)) {
        return callback(new Error("From Date must be earlier than To Date!"));
      } else if (new Date(value) > new Date()) {
        return callback(new Error("From Date must be earlier than Now!"));
      } else {
        callback();
      }
    };
    return {
      experienceForm: {
        title: "",
        position: "",
        city: "",
        country: "",
        from: -999,
        fromDate: "",
        toDate: "",
        present: false,
        content: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "Please input your company/organization name!",
            trigger: "blur"
          }
        ],
        country: [
          { required: true, message: "Please input country!", trigger: "blur" }
        ],
        fromDate: [
          {
            required: true,
            message: "Please input start date!",
            trigger: "blur"
          },
          {
            validator: validateFromDate,
            trigger: "change"
          }
        ],
        present: [
          {
            required: true,
            message: "Please indicate if you are currently working here!",
            trigger: "blur"
          }
        ],
        position: [
          {
            required: true,
            message: "Please input your position!",
            trigger: "blur"
          }
        ]
      },
      disabled: false,
      docID: "",
      deleteDisabled: false,
      username: null
    };
  },
  created: function() {
    this.username = window.localStorage.getItem("user");
    if (this.$props.fromArray != undefined) {
      this.experienceForm.title = this.$props.experience.title;
      this.experienceForm.city = this.$props.experience.location_city;
      this.experienceForm.country = this.$props.experience.location_country;
      this.experienceForm.fromDate = this.$props.experience.fromDate;
      this.experienceForm.toDate = this.$props.experience.toDate;
      this.experienceForm.present = this.$props.experience.present;
      this.experienceForm.position = this.$props.experience.position;
      this.experienceForm.content = this.$props.experience.content;
      this.docID = this.$props.experience.docID;
      if (!this.docID || this.docID == undefined) {
        this.deleteDisabled = true;
      } else {
        this.deleteDisabled = false;
      }
    }
  },
  methods: {
    updateExperience() {
      var count = this.$store.getters.experienceCount;
      if (count >= 5 && this.$props.experience.docID == undefined) {
        this.$notify.error(
          "Sorry! You have reached the limits (5) for experience entries!"
        );
        return;
      }
      this.$refs.experienceForm.validate(valid => {
        if (valid) {
          var experience, experiences;
          var month = new Array();
          month[0] = "Jan";
          month[1] = "Feb";
          month[2] = "Mar";
          month[3] = "Apr";
          month[4] = "May";
          month[5] = "Jun";
          month[6] = "Jul";
          month[7] = "Aug";
          month[8] = "Sep";
          month[9] = "Oct";
          month[10] = "Nov";
          month[11] = "Dec";
          var fromMonth = new Date(this.experienceForm.fromDate).getMonth();
          var fromYear = new Date(this.experienceForm.fromDate).getFullYear();
          var fromMonthStr = month[fromMonth];
          var fromDate = fromMonthStr + ", " + String(fromYear);
          var toMonth = new Date(this.experienceForm.toDate).getMonth();
          var toYear = new Date(this.experienceForm.toDate).getFullYear();
          var toMonthStr = month[toMonth];
          var toDate = toMonthStr + ", " + String(toYear);
          if (this.docID == undefined) {
            this.docID = makeid(11);
          }
          experience = {
            docID: this.docID,
            title: this.experienceForm.title,
            location_city: this.experienceForm.city
              ? this.experienceForm.city
              : "",
            location_country: this.experienceForm.country,
            position: this.experienceForm.position,
            fromDate: fromDate,
            toDate: toDate,
            from: new Date(this.experienceForm.fromDate).getFullYear(),
            present: this.experienceForm.present,
            content: this.experienceForm.content
              ? this.experienceForm.content
              : ""
          };
          if (window.localStorage.getItem("user")) {
            db.collection("resumes")
              .doc(this.$props.userID)
              .collection("resume")
              .doc("experience")
              .collection("experience")
              .doc(this.docID)
              .set(experience);
            experiences = this.$store.getters.experiences;
            experiences.forEach((experience, idx) => {
              if (experience.docID == this.docID) {
                experiences.splice(idx, idx + 1);
              }
            });
          }
          experiences = this.$store.getters.experiences;
          experiences.push(experience);
          this.$store.commit("setExperiences", experiences);
          if (this.$props.experience.docID == undefined) {
            this.$refs.experienceForm.resetFields();
            this.docID = undefined;
          }
          this.$notify.success("Entry updated!");
          this.$store.commit("addExperienceCount");
        }
      });
    },
    deleteExperience() {
      if (window.localStorage.getItem("user")) {
        db.collection("resumes")
          .doc(this.$props.userID)
          .collection("resume")
          .doc("experience")
          .collection("experience")
          .doc(this.docID)
          .delete();
      }
      var experiences = this.$store.getters.experiences;
      experiences.forEach((experience, idx) => {
        if (experience.docID == this.docID) {
          experiences.splice(idx, idx + 1);
        }
      });
      this.$notify.error("Entry deleted!");
      this.$store.commit("delExperienceCount");
    }
  },
  watch: {
    experienceForm: {
      handler(val) {
        if (val.present == true) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      },
      deep: true
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
.location-container {
  display: grid;
  grid-column-gap: 50px;
  grid-template-columns: auto auto;
}
.date-container {
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 10px;
}

.date-container .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

@media (max-width: 768px) {
  .date-container {
    display: block;
  }
  .location-container {
    display: block;
  }
}
</style>
