import { createRouter, createWebHistory } from "vue-router"


import NotFound from "@/views/NotFound.vue";
import Forbidden from "@/views/Forbidden.vue";

// user
import Register from "@/views/secure/Register.vue";
import Admin from "@/views/admin/Admin.vue";
import Login from "@/views/secure/Login.vue";
import ResetPassword from "@/views/secure/ResetPassword.vue";

// movie
import Movie from "@/views/pages/Movie.vue";
import MovieFront from "@/views/pages/MovieFront.vue";
import OneMovie from "@/views/pages/OneMovie.vue";

// store
import CinemaBack from "../views/cinemaback/CinemaBack.vue";

import CinemaMovieSchedule from "../views/cinemaback/CinemaMovieSchedule.vue";
import CinemaAdsSet from "@/views/cinemaback/CinemaAdsSet.vue";


// temp
import TempMoney from "@/views/TempMoney.vue"
import TheWelcome from '../components/TheWelcome.vue'

import Test from "@/views/cinemaback/Test.vue";

//行程表
import MovieCalender from "@/views/movie/MovieCalender.vue";
import MovieWithStore from "@/views/movie/MovieWithStore.vue";



const routes = [
    { path: "/test", name: "test", component: Test },
// temp
    { path: "/money", name: "temp-money-link", component: TempMoney },
    { path: "/test", name: "test-link", component: TheWelcome },

// user
    { path: "/:pathMatch(.*)", name: "notfound-link", component: NotFound },
    { path: "/403", name: "forbidden-link", component: Forbidden },

    { path: "/admin", name: "admin-link", component: Admin },
    { path: "/secure/login", name: "login-link", component: Login },
    { path: '/secure/reset-password', name: 'reset-password', component: ResetPassword },

// movie
    { name:"movie-link" , path:"/movie" , component: Movie},
    { name:"moviefront-link" , path:"/moviefront" , component: MovieFront},
    { name:"onemovie-link" , path:"/onemovie/:id" , component: OneMovie ,props: true},

// store

    {name:"back-link",path:'/',component:CinemaBack},
    {name:"schedule-link",path:'/schedule',component:CinemaMovieSchedule},
    {name:"ads-set-link",path:'/ads/set',component:CinemaAdsSet},

//schedule
    {name:"calender-link",path:'/calender',component:MovieCalender},
    {name:"movie-with-store-link",path:'/moviewithstore',component:MovieWithStore},
]

export default createRouter({
    history: createWebHistory(),
    routes: routes,
})
