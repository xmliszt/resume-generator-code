<template>
  <div class="edit-experience">
    <div ref="exp" class="experience-section">
      <singleExperience
        v-for="experience in sortedArray"
        :key="experience.docID"
        :experience="experience"
        :fromArray="true"
        :userID="userID"
      />
    </div>
  </div>
</template>

<script>
import singleExperience from "@/components/singleExperience.vue";
import { db } from "./../firebase";
export default {
  components: {
    singleExperience
  },
  props: ["userID"],
  firestore() {
    if (window.localStorage.getItem("user")) {
      return {
        experiences: db
          .collection("resumes")
          .doc(this.$props.userID)
          .collection("resume")
          .doc("experience")
          .collection("experience")
      };
    }
  },
  computed: {
    sortedArray: function() {
      var newArray;
      if (window.localStorage.getItem("user")) {
        newArray = this.experiences.slice();
      } else {
        newArray = this.$store.getters.experiences;
      }
      this.$emit("experienceData", newArray.sort(compare));
      return newArray.sort(compare);
    }
  }
};
function compare(a, b) {
  if (a.from == undefined) {
    return -1;
  } else if (b.from == undefined) {
    return 1;
  }
  if (a.from < b.from) return 1;
  if (a.from > b.from) return -1;
  return 0;
}
</script>

<style>
.add-experience {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
