import { createRouter, createWebHistory } from "vue-router"

import MainPage from "@/views/main_page/MainPage.vue"
import NotFound from "@/views/NotFound.vue";
import Forbidden from "@/views/Forbidden.vue";

// user
import Register from "@/views/secure/Register.vue";
import Login from "@/views/secure/Login.vue";
import ResetPassword from "@/views/secure/ResetPassword.vue";

// movie
import Movie from "@/views/pages/Movie.vue";
import MovieFront from "@/views/pages/MovieFront.vue";
import OneMovie from "@/views/pages/OneMovie.vue";

// store
import CinemaBack from "../views/cinemaback/CinemaBack.vue";
import CinemaModal from "../views/cinemaback/CinemaModal.vue";
import CinemaMovieSchedule from "../views/cinemaback/CinemaMovieSchedule.vue";
import CinemaAdsSet from "@/views/cinemaback/CinemaAdsSet.vue";

// booking
import InsertSeatingList from "@/views/booking/InsertSeatingList.vue";

// temp
import TempMoney from "@/views/TempMoney.vue"
import TheWelcome from '../components/TheWelcome.vue'
import MovieCalender from "@/views/movie/MovieCalender.vue";
import MovieWithStore from "@/views/movie/MovieWithStore.vue";

const routes = [
// temp
    { path: "/money", name: "temp-money-link", component: TempMoney },
    { path: "/test", name: "test-link", component: TheWelcome },
    { path: "/testCalender", name: "test-calender-link", component: MovieCalender },
    { path: "/testMovieWithStore", name: "test-testMovieWithStore-link", component: MovieWithStore },

// user
    { path: "/:pathMatch(.*)", name: "notfound-link", component: NotFound },
    { path: "/403", name: "forbidden-link", component: Forbidden },

    { path: "/secure/register", name: "register-link", component: Register },
    { path: "/secure/login", name: "login-link", component: Login },
    { path: '/secure/reset-password', name: 'reset-password', component: ResetPassword },

// movie
    { name:"movie-link" , path:"/movie" , component: Movie},
    { name:"moviefront-link" , path:"/moviefront" , component: MovieFront},
    { name:"onemovie-link" , path:"/onemovie/:id" , component: OneMovie ,props: true},

// store

    {name:"back-link",path:'/backend',component:CinemaBack},
    {name:"schedule-link",path:'/schedule',component:CinemaMovieSchedule},
    {name:"ads-set-link",path:'/ads/set',component:CinemaAdsSet},

// booking
    { path: "/", name: "main-page-link", component: MainPage },
    // { path: "/movie", name: "movie-link", component: () => import('@/views/booking/choose_store_and_time/JustTempForBooking.vue') },
    { 
        path: "/booking", name: "booking-link", component: InsertSeatingList,
        children: [
            {
                path: "choose-seat",
                name: "choose-seat-link",
                component: () => import('@/views/booking/ChooseSeat.vue'), 
            },
        ]
    },
]

export default createRouter({
    history: createWebHistory(),
    routes: routes,
})
