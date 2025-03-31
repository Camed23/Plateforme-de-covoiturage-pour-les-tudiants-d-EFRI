import AuthUser from "../components/AuthUser.vue"
import { createRouter, createWebHistory } from 'vue-router';
import Sign from "../components/sign.vue";
import Login from "../components/login.vue";
import home from "../components/home.vue"
import AboutUs from "../components/AboutUs.vue";
import App from "../App.vue";
import profile from '../components/profile.vue';
import TrajetForm from '../components/TrajetForm.vue';
import ModifierTrajet from '../components/ModifierTrajet.vue';
import Reservation from '../components/trajetsReserves.vue';
import TrajetListUser from "../components/TrajetListUser.vue";
import ListeTrajet from "../components/ListeTrajet.vue";
const routes = [
    {
        path :'/AuthUser',
        component : AuthUser,
        children : [
            {
                path : 'sign',
                component : Sign,
                name : 'sign'
            },
            {
                path : 'login',
                component : Login,
                name : 'login'
            }
        ]
    },
    {
        path :'/',
        component : home,
        name : 'home'
    },
    {
        path: '/apropos',
        name: 'AboutUs',
        component: AboutUs
    },
    {
        path :'/logout',
        component : Login,
    },{
        path: '/profile',
        name: 'profie',
        component: profile,
    },
 
    {
        path: '/TrajetForm',
        name: 'TrajetForm',
        component: TrajetForm,
    },

    {
        path: '/TrajetListUser',
        name: 'TrajetListUser',
        component: TrajetListUser,
    },
    {
        path: '/Modifier/:id',
        name: 'ModifierTrajet',
        component: ModifierTrajet,
    },
    {
        path: '/reservation/',
        name: 'Reservation',
        component: Reservation,
    },{
        path: '/listetrajet',
        name: 'ListeTrajet',
        component: ListeTrajet,
    },
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});
    
export default router