import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
import router from "@/router";
import "chartkick/chart.js";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";

createApp(App).use(Chartkick.use(Chart)).use(router,).mount("#app");
