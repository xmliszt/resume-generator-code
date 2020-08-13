import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    profile: new Object(),
    educations: [{ docID: undefined }],
    experiences: [{ docID: undefined }],
    projects: [{ docID: undefined }],
    skills: [{ docID: undefined }],
    educationCount: 0,
    experienceCount: 0,
    projectCount: 0,
    skillCount: 0
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setEducations(state, educations) {
      state.educations = educations;
    },
    setExperiences(state, experiences) {
      state.experiences = experiences;
    },
    setProjects(state, projects) {
      state.projects = projects;
    },
    setSkills(state, skills) {
      state.skills = skills;
    },
    setEducationCount(state, count) {
      state.educationCount = count;
    },
    setExperienceCount(state, count) {
      state.experienceCount = count;
    },
    setProjectCount(state, count) {
      state.projectCount = count;
    },
    setSkillCount(state, count) {
      state.skillCount = count;
    },
    addEducationCount(state) {
      state.educationCount++;
    },
    addExperienceCount(state) {
      state.experienceCount++;
    },
    addProjectCount(state) {
      state.projectCount++;
    },
    addSkillCount(state) {
      state.skillCount++;
    },
    delEducationCount(state) {
      state.educationCount--;
    },
    delExperienceCount(state) {
      state.experienceCount--;
    },
    delProjectCount(state) {
      state.projectCount--;
    },
    delSkillCount(state) {
      state.skillCount--;
    }
  },
  getters: {
    profile: state => state.profile,
    social: state => state.social,
    educations: state => state.educations,
    experiences: state => state.experiences,
    projects: state => state.projects,
    skills: state => state.skills,
    educationCount: state => state.educationCount,
    experienceCount: state => state.experienceCount,
    projectCount: state => state.projectCount,
    skillCount: state => state.skillCount
  }
});

export default store;
