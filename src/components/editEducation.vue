<template>
  <div class="edit-education">
    <div ref="edu" class="education-section">
      <singleEducation
        v-for="education in sortedArray"
        :key="education.docID"
        :education="education"
        :fromArray="true"
        :userID="userID"
      />
    </div>
  </div>
</template>

<script>
import singleEducation from "@/components/singleEducation.vue";
import { db } from "./../firebase";
export default {
  props: ["userID"],
  components: {
    singleEducation
  },
  firestore() {
    if (window.localStorage.getItem("user")) {
      return {
        educations: db
          .collection("resumes")
          .doc(this.$props.userID)
          .collection("resume")
          .doc("education")
          .collection("education")
      };
    }
  },
  computed: {
    sortedArray: function() {
      var newArray;
      if (window.localStorage.getItem("user")) {
        newArray = this.educations.slice();
      } else {
        newArray = this.$store.getters.educations;
      }
      this.$emit("educationData", newArray.sort(compare));
      return newArray.sort(compare);
    }
  }
};

function compare(a, b) {
  if (a.from == undefined) {
    return -1;
  } else if (b.from == undefined) {
    return 1;
  } else {
    if (a.from < b.from) return 1;
    if (a.from > b.from) return -1;
  }
  return 0;
}
</script>

<style>
.add-education {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
