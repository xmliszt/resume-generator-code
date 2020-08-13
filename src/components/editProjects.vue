<template>
  <div class="edit-project">
    <div ref="exp" class="project-section">
      <singleProject
        v-for="project in sortedArray"
        :key="project.id"
        :project="project"
        :fromArray="true"
        :userID="userID"
      />
    </div>
  </div>
</template>

<script>
import singleProject from "@/components/singleProject.vue";
import { db } from "./../firebase";
export default {
  components: {
    singleProject
  },
  props: ["userID"],
  firestore() {
    if (window.localStorage.getItem("user")) {
      return {
        projects: db
          .collection("resumes")
          .doc(this.$props.userID)
          .collection("resume")
          .doc("projects")
          .collection("projects")
      };
    }
  },
  computed: {
    sortedArray: function() {
      var newArray;
      if (window.localStorage.getItem("user")) {
        newArray = this.projects.slice();
      } else {
        newArray = this.$store.getters.projects;
      }
      this.$emit("projectData", newArray.sort(compare));
      return newArray.sort(compare);
    }
  }
};

// eslint-disable-next-line no-unused-vars
function compare(a, b) {
  if (a.title == undefined && b.title != undefined) {
    return -1;
  } else if (a.title != undefined && b.title == undefined) {
    return 1;
  } else {
    return 0;
  }
}
</script>

<style>
.add-project {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
