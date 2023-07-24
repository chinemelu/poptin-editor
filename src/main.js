import Vue from 'vue/dist/vue.esm.js'
import App from './App.vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { 
  faChevronDown, 
  faChevronRight, 
  faTextWidth, 
  faImage, 
  faBold, 
  faPencil,
  faTimes

} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add( 
  faChevronDown, 
  faChevronRight, 
  faTextWidth, 
  faImage, 
  faBold, 
  faPencil,
  faTimes
);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
