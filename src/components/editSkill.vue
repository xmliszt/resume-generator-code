<template>
  <div class="edit-skill">
    <div ref="exp" class="skill-section">
      <singleSkill
        v-for="skill in sortedArray"
        :key="skill.docID"
        :skill="skill"
        :fromArray="true"
        :userID="userID"
      />
    </div>
  </div>
</template>

<script>
import singleSkill from "@/components/singleSkill.vue";
import { db } from "./../firebase";
export default {
  components: {
    singleSkill
  },
  props: ["userID"],
  firestore() {
    if (window.localStorage.getItem("user")) {
      return {
        skills: db
          .collection("resumes")
          .doc(this.$props.userID)
          .collection("resume")
          .doc("skills")
          .collection("skills")
      };
    }
  },
  computed: {
    sortedArray: function() {
      var newArray;
      if (window.localStorage.getItem("user")) {
        newArray = this.skills.slice();
      } else {
        newArray = this.$store.getters.skills;
      }
      this.$emit("skillData", newArray.sort(compare));
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
.add-skill {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
