import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import weather from "../views/Weather.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/weather/:state/:city",
      name: "weather",
      component: weather,
      meta: {
        title: "Weather",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${
    to.params.city ? to.params.city +' ' + to.params.state : to.meta.title
  } | The local weather`;
  next();
});

export default router;
