<template>
  <div></div>
</template>

<script>
export default {
  props: ["profile", "educations", "experiences", "projects", "skills"]
};
</script>

<style scoped>
ul {
  padding-inline-start: 20px !important;
  margin-block-start: 0.5em !important;
  margin-block-end: 0.5em !important;
}

hr {
  margin-left: 26px;
  margin-right: 26px;
  height: 0.2px;
  color: black;
  background-color: black;
}

.big-name {
  font-size: 26px;
}

.subtitle-intro {
  font-size: 12px;
  text-align: justify;
}

.social-media-link {
  font-size: 12px;
  text-align: right;
  font-style: italic;
}

.section-title {
  font-size: 14px;
  font-weight: 500;
  font-variant-caps: small-caps;
}

.entry-title {
  font-size: 14px;
  font-weight: 700;
  text-transform: capitalize;
}

.entry-subtitle {
  font-size: 10px;
  font-style: italic;
}

.datetime-text {
  font-size: 10px;
  font-style: italic;
}

.location-text {
  font-size: 14px;
}

.entry-content {
  font-size: 10px;
}

.basic-template {
  font-family: "Times", "Arial";
  padding-bottom: 26px;
  padding-left: 26px;
  padding-right: 26px;
}

.title-section {
  padding-top: 26px;
  padding-left: 26px;
  padding-right: 26px;
  text-align: left;
  display: block;
  display: grid;
  grid-template-columns: auto auto;
}

.education-section {
  padding-top: 5px;
  padding-left: 26px;
  padding-right: 26px;
  text-align: left;
}

.education-single {
  padding-left: 6px;
  padding-top: 6px;
}

.experience-section {
  padding-top: 5px;
  padding-left: 26px;
  padding-right: 26px;
  text-align: left;
}

.experience-single {
  padding-left: 6px;
  padding-top: 6px;
}

.project-section {
  padding-top: 5px;
  padding-left: 26px;
  padding-right: 26px;
  text-align: left;
}

.skill-section {
  padding-top: 5px;
  padding-left: 26px;
  padding-right: 26px;
  text-align: left;
}
</style>
