<template>
  <div class="preview-template">
    <div class="title-section">
      <div>
        <div>
          <span class="big-name">{{ profile.name }}</span>
        </div>
        <div style="width: 90%" class="subtitle-intro">
          <span>{{ profile.subtitle }}</span>
        </div>
      </div>
      <div class="social-media-link">
        <div>
          <span>Email: {{ profile.email }}</span>
        </div>
        <div>
          <span v-if="profile.website">Website: {{ profile.website }}</span>
        </div>
        <div>
          <span v-if="profile.git">GitHub: {{ profile.git }}</span>
        </div>
        <div>
          <span v-if="profile.linkedin">LinkedIn: {{ profile.linkedin }}</span>
        </div>
        <div>
          <span v-if="profile.youtube">YouTube: {{ profile.youtube }}</span>
        </div>
      </div>
    </div>
    <hr v-if="educations.length > 0" />
    <div class="education-section" v-if="educations.length > 0">
      <div>
        <span class="section-title">EDUCATION</span>
      </div>
      <div>
        <div
          class="education-single"
          v-for="education in educations"
          :key="education.name"
        >
          <div style="display: flex; justify-content: space-between;">
            <div>
              <div class="entry-title">
                <span>{{ education.name }}</span>
              </div>
              <div class="line-break"></div>
              <div class="entry-subtitle">
                <span
                  ><i>{{ education.degree }}</i></span
                >
              </div>
            </div>
            <div style="text-align: right;">
              <div v-if="education.location_city != ''" class="location-text">
                <span
                  >{{ education.location_city }},
                  {{ education.location_country }}</span
                >
              </div>
              <div v-else class="location-text">
                <span>{{ education.location_country }}</span>
              </div>

              <div class="datetime-text">
                <i v-if="!education.present"
                  >{{ education.fromDate }} - {{ education.toDate }}</i
                >
                <i v-else>{{ education.fromDate }} - present</i>
              </div>
            </div>
          </div>
          <div class="line-break"></div>
          <div style="padding-left: 12px; text-align: justify;">
            <div v-if="education.cgpa > 0" class="entry-content">
              <span>CGPA: {{ education.cgpa }}</span>
            </div>
            <div class="entry-content">
              <span>{{ education.content }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr v-if="experiences.length > 0" />
    <div class="experience-section" v-if="experiences.length > 0">
      <div class="section-title">
        <span>EXPERIENCE</span>
      </div>
      <div>
        <div
          class="experience-single"
          v-for="experience in experiences"
          :key="experience.title"
        >
          <div style="display: flex; justify-content: space-between;">
            <div>
              <div class="entry-title">
                <span>{{ experience.title }}</span>
              </div>
              <div class="line-break"></div>
              <div class="entry-subtitle">
                <span
                  ><i>{{ experience.position }}</i></span
                >
              </div>
            </div>
            <div style="text-align: right;">
              <div class="location-text">
                <span v-if="experience.location_city != ''"
                  >{{ experience.location_city }},
                  {{ experience.location_country }}</span
                >
                <span v-else>{{ experience.location_country }}</span>
              </div>
              <div class="datetime-text">
                <i v-if="!experience.present"
                  >{{ experience.fromDate }} - {{ experience.toDate }}</i
                >
                <i v-else>{{ experience.fromDate }} - present</i>
              </div>
            </div>
          </div>
          <div class="line-break"></div>
          <div style="padding-left: 12px; text-align: justify;">
            <div class="entry-content">
              <span>{{ experience.content }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr v-if="projects.length > 0" />
    <div class="project-section" v-if="projects.length > 0">
      <div class="section-title">
        <span>PROJECTS</span>
      </div>
      <div>
        <ul>
          <li v-for="project in projects" :key="project.title">
            <b class="entry-subtitle">{{ project.title }}: </b>
            <span style="text-align: justify;" class="entry-content">
              {{ project.desc }}
            </span>
          </li>
        </ul>
      </div>
    </div>
    <hr v-if="skills.length > 0" />
    <div class="skill-section" v-if="skills.length > 0">
      <div class="section-title">
        <span>SKILLS</span>
      </div>
      <div>
        <ul>
          <li v-for="skill in skills" :key="skill.title">
            <b class="entry-subtitle">{{ skill.title }}: </b>
            <span class="entry-content">{{ skill.content }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["profile", "educations", "experiences", "projects", "skills"]
};
</script>

<style scoped>
ul {
  padding-inline-start: 20px !important;
  margin-block-start: 2px !important;
  margin-block-end: 2px !important;
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
  font-size: 9px;
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
