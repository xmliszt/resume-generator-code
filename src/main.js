import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLinkedin,
  faGithubSquare,
  faGoogle
} from "@fortawesome/free-brands-svg-icons";
import VueFirestore from "vue-firestore";
import {
  faEnvelope,
  faUserCircle,
  faCopyright
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import router from "./router";
import store from "./store";

Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;

library.add(faUserCircle);
library.add(faLinkedin);
library.add(faGithubSquare);
library.add(faEnvelope);
library.add(faCopyright);
library.add(faGoogle);
Vue.use(VueFirestore);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
