<template>
  <div style="margin-bottom: 20px">
    <el-card class="single-education" shadow="hover">
      <el-form
        ref="educationForm"
        :model="educationForm"
        :rules="rules"
        label-width="120px"
        label-position="left"
        status-icon
      >
        <el-form-item label="School Name" prop="name">
          <el-input
            v-model="educationForm.name"
            placeholder="Your institution name"
            maxlength="80"
            show-word-limit
            clearable
          ></el-input>
        </el-form-item>
        <div class="location-container">
          <el-form-item label="Location" prop="city">
            <el-input
              v-model="educationForm.city"
              placeholder="city"
              maxlength="50"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label=" " prop="country" label-width="20px">
            <el-input
              v-model="educationForm.country"
              placeholder="country"
              maxlength="30"
              clearable
            ></el-input>
          </el-form-item>
        </div>

        <div class="date-container">
          <el-form-item
            label="From Date"
            prop="fromDate"
            :error="fromDateError"
          >
            <el-date-picker
              v-model="educationForm.fromDate"
              type="month"
              placeholder="Starting date"
              size="small"
              format="MMM yyyy"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="To Date" prop="toDate" label-width="70px">
            <el-date-picker
              v-model="educationForm.toDate"
              type="month"
              placeholder="Ending date"
              size="small"
              format="MMM yyyy"
              :disabled="formDisabled"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="Present?" prop="present">
            <el-switch v-model="educationForm.present"></el-switch>
          </el-form-item>
        </div>
        <el-form-item label="Degree" prop="degree">
          <el-input
            v-model="educationForm.degree"
            maxlength="100"
            show-word-limit
            placeholder="Highest degree"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="CGPA" prop="cgpa">
          <el-slider
            v-model="educationForm.cgpa"
            :min="0.0"
            :max="5.3"
            :step="0.01"
            show-input
            :show-input-controls="false"
          ></el-slider>
        </el-form-item>
        <el-form-item label="Description" prop="content">
          <el-input
            v-model="educationForm.content"
            type="textarea"
            prop="content"
            placeholder="What is your major/minor? Interested area? ..."
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
            @click="updateEducation"
            size="small"
            >Add</el-button
          >
          <div v-else>
            <el-button
              v-if="username"
              type="primary"
              @click="updateEducation"
              size="small"
              >Update</el-button
            >
            <el-button type="danger" @click="deleteEducation" size="small"
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
  props: ["education", "fromArray", "userID"],
  data() {
    var validateFromDate = (rule, value, callback) => {
      if (new Date(value) > new Date(this.educationForm.toDate)) {
        return callback(new Error("From Date must be earlier than To Date!"));
      } else if (new Date(value) > new Date()) {
        return callback(new Error("From Date must be earlier than Now!"));
      } else {
        callback();
      }
    };
    return {
      educationForm: {
        name: "",
        degree: "",
        cgpa: 0.0,
        city: "",
        country: "",
        from: -999,
        fromDate: "",
        toDate: "",
        present: false,
        content: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input your institution name!",
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
            message: "Please indicate if you are currently studying here!",
            trigger: "blur"
          }
        ],
        degree: [
          {
            required: true,
            message: "Please input your current pursuing highest degree!",
            trigger: "blur"
          }
        ]
      },
      show: true,
      docID: "",
      formDisabled: false,
      deleteDisabled: false,
      fromDateError: "",
      username: null
    };
  },
  created: function() {
    this.username = window.localStorage.getItem("user");
    if (this.$props.fromArray != undefined) {
      this.educationForm.name = this.$props.education.name;
      this.educationForm.city = this.$props.education.location_city;
      this.educationForm.country = this.$props.education.location_country;
      this.educationForm.fromDate = this.$props.education.fromDate;
      this.educationForm.toDate = this.$props.education.toDate;
      this.educationForm.present = this.$props.education.present;
      this.educationForm.degree = this.$props.education.degree;
      this.educationForm.cgpa = this.$props.education.cgpa;
      this.educationForm.content = this.$props.education.content;
      this.docID = this.$props.education.docID;
      if (!this.docID || this.docID == undefined) {
        this.deleteDisabled = true;
      } else {
        this.deleteDisabled = false;
      }
    }
  },
  methods: {
    updateEducation() {
      var count = this.$store.getters.educationCount;
      if (count >= 3 && this.$props.education.name == undefined) {
        this.$notify.error(
          "Sorry! You have reached the limits (3) for education entries!"
        );
        return;
      }
      this.$refs.educationForm.validate(valid => {
        if (valid) {
          var education, educations;
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
          var fromMonth = new Date(this.educationForm.fromDate).getMonth();
          var fromYear = new Date(this.educationForm.fromDate).getFullYear();
          var fromMonthStr = month[fromMonth];
          var fromDate = fromMonthStr + ", " + String(fromYear);
          var toMonth = new Date(this.educationForm.toDate).getMonth();
          var toYear = new Date(this.educationForm.toDate).getFullYear();
          var toMonthStr = month[toMonth];
          var toDate = toMonthStr + ", " + String(toYear);
          if (this.docID == undefined) {
            this.docID = makeid(11);
          }
          education = {
            docID: this.docID,
            name: this.educationForm.name,
            location_city: this.educationForm.city
              ? this.educationForm.city
              : "",
            location_country: this.educationForm.country,
            degree: this.educationForm.degree,
            cgpa: this.educationForm.cgpa,
            fromDate: fromDate,
            toDate: toDate,
            from: new Date(this.educationForm.fromDate).getFullYear(),
            present: this.educationForm.present,
            content: this.educationForm.content
              ? this.educationForm.content
              : ""
          };
          if (window.localStorage.getItem("user")) {
            db.collection("resumes")
              .doc(this.$props.userID)
              .collection("resume")
              .doc("education")
              .collection("education")
              .doc(this.docID)
              .set(education);
            educations = this.$store.getters.educations;
            educations.forEach((education, idx) => {
              if (education.docID == this.docID) {
                educations.splice(idx, idx + 1);
              }
            });
          }
          educations = this.$store.getters.educations;
          educations.push(education);
          this.$store.commit("setEducations", educations);
          if (this.$props.education.name == undefined) {
            this.$refs.educationForm.resetFields();
            this.docID = undefined;
          }
          this.$notify.success("Entry updated!");
          this.$store.commit("addEducationCount");
        }
      });
    },
    deleteEducation() {
      if (window.localStorage.getItem("user")) {
        db.collection("resumes")
          .doc(this.$props.userID)
          .collection("resume")
          .doc("education")
          .collection("education")
          .doc(this.docID)
          .delete();
      }
      var educations = this.$store.getters.educations;
      educations.forEach((education, idx) => {
        if (education.docID == this.docID) {
          educations.splice(idx, idx + 1);
        }
      });
      this.$notify.error("Entry deleted!");
      this.$store.commit("delEducationCount");
    }
  },
  watch: {
    educationForm: {
      handler(val) {
        if (val.present) {
          this.formDisabled = true;
        } else {
          this.formDisabled = false;
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
