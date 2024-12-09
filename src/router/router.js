import { createRouter, createWebHistory } from "vue-router"


// user


// movie



// store
import CinemaBack from "../views/cinemaback/CinemaBack.vue";
import CinemaAdsSet from "@/views/cinemaback/CinemaAdsSet.vue";

// booking


// temp


const routes = [
// temp



// user
    
// movie
 

// store

    {name:"back-link",path:'/backend',component:CinemaBack},
    {name:"ads-set-link",path:'/ads/set',component:CinemaAdsSet},

// booking
   
]

export default createRouter({
    history: createWebHistory(),
    routes: routes,
})
