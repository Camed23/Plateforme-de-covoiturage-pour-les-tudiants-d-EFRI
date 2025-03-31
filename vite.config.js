import { defineConfig } from 'vite' /*Permet de définir la configuration avec l’autocomplétion et les
types. C'est une méthode fournie par Vite pour organiser la configuration.*/
import vue from '@vitejs/plugin-vue' /*Importe le plugin Vue pour que Vite puisse gérer les fichiers
.vue.*/
// https://vitejs.dev/config/
/*La configuration est définie par defineConfig, avec plugins: [vue()] qui ajoute le support de Vue
pour traiter les composants .vue.*/
export default defineConfig({
    //Configuration du serveur et des proxies :
    plugins: [vue()],
    //server : Définit les options pour le serveur de développement.
    server: {
        //proxy : Contient les configurations de proxy pour rediriger les requêtes
        proxy: {
            /*/register et /login : Ces deux entrées définissent un proxy pour les routes /register et /login qui
            pointent vers le backend.*/
            '/AuthUser/sign': {
                //target : Spécifie l’URL du serveur backend (ici http://localhost:3000).
                target: 'http://localhost:3000/AuthUser/sign', // Remplacez par l'URL de votre serveur backend
                //Modifie l’origine de la requête pour qu’elle semble provenir de l’URL de target
                changeOrigin: true,
                //Désactive la vérification SSL, ce qui est utile si le backend n’utilise pas HTTPS (en développement).
                secure: false, // Utilisez false si vous n'avez pas de certificat SSL
            },
            '/AuthUser/login': {
                target: 'http://localhost:3000/AuthUser/login',
                changeOrigin: true,
                secure: false,
            },
            '/home': {
                target: 'http://localhost:3000/home',
                changeOrigin: true,
                secure: false,
            },
            '/TrajetForm': {
                //target : Spécifie l’URL du serveur backend (ici http://localhost:3000).
                target: 'http://localhost:3000/TrajetForm', // Remplacez par l'URL de votre serveur backend
                //Modifie l’origine de la requête pour qu’elle semble provenir de l’URL de target
                changeOrigin: true,
                //Désactive la vérification SSL, ce qui est utile si le backend n’utilise pas HTTPS (en développement).
                secure: false, // Utilisez false si vous n'avez pas de certificat SSL
            },
            '/trajets': {
                //target : Spécifie l’URL du serveur backend (ici http://localhost:3000).
                target: 'http://localhost:3000/trajets', // Remplacez par l'URL de votre serveur backend
                //Modifie l’origine de la requête pour qu’elle semble provenir de l’URL de target
                changeOrigin: true,
                //Désactive la vérification SSL, ce qui est utile si le backend n’utilise pas HTTPS (en développement).
                secure: false, // Utilisez false si vous n'avez pas de certificat SSL
            },
            '/Modifier': {
                //target : Spécifie l’URL du serveur backend (ici http://localhost:3000).
                target: 'http://localhost:3000/Modifier', // Remplacez par l'URL de votre serveur backend
                //Modifie l’origine de la requête pour qu’elle semble provenir de l’URL de target
                changeOrigin: true,
                //Désactive la vérification SSL, ce qui est utile si le backend n’utilise pas HTTPS (en développement).
                secure: false, // Utilisez false si vous n'avez pas de certificat SSL
            },
            '/reservations' :  {
                //target : Spécifie l’URL du serveur backend (ici http://localhost:3000).
                target: 'http://localhost:3000/reservations', // Remplacez par l'URL de votre serveur backend
                //Modifie l’origine de la requête pour qu’elle semble provenir de l’URL de target
                changeOrigin: true,
                //Désactive la vérification SSL, ce qui est utile si le backend n’utilise pas HTTPS (en développement).
                secure: false, // Utilisez false si vous n'avez pas de certificat SSL
            },
            '/listetrajet': {
                target: 'http://localhost:3000/listetrajet',
                changeOrigin: true,
                secure: false,
            },
            '/reserver': {
                target: 'http://localhost:3000/reserver',
                changeOrigin: true,
                secure: false,
            },
            '/suggestions': {
                target: 'http://localhost:3000/suggestions',
                changeOrigin: true,
                secure: false
            }

        },
    },
})