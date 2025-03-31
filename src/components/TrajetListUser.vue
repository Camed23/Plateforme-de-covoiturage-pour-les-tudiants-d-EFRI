<template>
    <div class="listes">
        <div v-for="trajet in trajets" 
            :key="trajet.id" 
            class="carte_de_trajet">
            
            <!-- Image du trajet -->
            <img src="../assets/Trajet.jpg" 
                    alt="Trajet" 
                    class="image_trajet" />

            <!-- Informations du trajet -->
            <div class="details_trajet">
                <h3>{{ trajet.lieu_depart }} - {{ trajet.lieu_arrive }}</h3>
                <p>Date : {{ trajet.date_trajet }}</p>
                <p>Heure : {{ trajet.heure_depart }}</p>
                <p>Places disponibles : {{ trajet.places_disponibles }}</p>

                <button class="btn-delete" @click="supprimerTrajet(trajet.id)">Supprimer</button>
                <button ><RouterLink :to ="{path :'/Modifier/'+JSON.stringify(trajet.id)}">modifier</RouterLink></button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
    data : function(){
        return {
            trajets: [],
        }
    },
    mounted(){
        this.fetchTrajet()
    }
    ,
    methods: {
        async supprimerTrajet(id) {
            try {
                await axios.delete(`http://localhost:3000/trajets/${id}`); // Vérifie que l'URL est correcte
                this.trajets =  this.trajets.filter(element => element.id !== id);                
            } catch (error) {
                console.error('Erreur lors de la suppression du trajet:', error); // Log l'erreur pour le débogage
            }
        },
        async fetchTrajet(id) {
            try {
                const response = await axios.post(`http://localhost:3000/trajets/${id}`,{},{ withCredentials: true }) ; // Vérifie que l'URL est correcte
                this.trajets = response.data.results;
                if(response.data.success){
                    this.$router.push(response.data.redirect)
                }

            } catch (error) {
                console.error('Erreur lors de la recuperation du trajet:', error); // Log l'erreur pour le débogage
            }
        },
    },
};
</script>

<style scoped>

.listes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Grille responsive */
    gap: 20px; /* Espace entre les cartes */
    margin: 40px auto; /* Ajout de marge entre la barre de recherche et les cards */
    max-width: 1200px; /* Limite la largeur maximale */
    padding: 0 20px; /* Ajoute des espaces sur les côtés */
    justify-content: center; /* Centre les cartes dans le conteneur */
}

.carte_de_trajet {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden; /* Masquer tout dépassement pour garder les coins arrondis */
    text-align: center; /* Centrer le contenu */
}

.image_trajet {
    width: 100%;
    height: 150px;
    object-fit: cover; /* S'assurer que l'image remplit l'espace correctement */
}

.details_trajet {
    padding: 10px;
}

.details_trajet h3 {
    font-size: 18px;
    margin: 10px 0;
    color: #333;
}

.details_trajet p {
    margin: 5px 0;
    font-size: 14px;
    color: #555;
}

button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.btn-delete{
    background-color: red;
    color: #fff;
    margin-right: 20px;
}
button:hover {
    background-color: #0056b3;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.trajet_indisponible {
    color: red; /* Met le texte en rouge */
    font-weight: bold; /* Optionnel : rend le texte en gras */
}


</style>