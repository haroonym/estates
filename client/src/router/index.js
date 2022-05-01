import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Team from '../views/Team.vue';
import News from '../views/News.vue';
import Details from '../views/Details.vue';
import DetailsEstate from '../views/DetailsEstate.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/team',
    name: 'Team',
    component: Team,
  },
  {
    path: '/news',
    name: 'News',
    component: News,
  },
  {
    path: '/details/:staff_id',
    name: 'Details',
    component: Details,
    props: true,
  },
  {
    path: '/detailsestate/:id',
    name: 'DetailsEstate',
    component: DetailsEstate,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
