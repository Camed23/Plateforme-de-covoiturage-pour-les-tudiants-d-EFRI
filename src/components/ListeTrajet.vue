<template>
    <NavBarc/>
    <div>     
        <div><h2>{{ first_msg }}</h2></div>
        <!--Section barre de trajet-->
    <div class="search-bar-container">
      <div class="search-bar">
        <div class="input-group">
          <span class="icon">🔵</span>
          <input type="text" placeholder="Départ" />
        </div>
        <div class="separator"></div>
        <div class="input-group">
          <span class="icon">🔵</span>
          <input type="text" placeholder="Destination" />
        </div>
        <div class="separator"></div>
        <div class="input-group">
          <span class="icon">📅</span>
          <input type="date" />
        </div>
        <div class="separator"></div>
        <div class="input-group">
          <span class="icon">👤</span>
          <input type="text" placeholder="1 passager" />
        </div>
        <button class="search-button" @click="rechercherTrajet">Rechercher</button>

      </div>
    </div>
        <div class="trajets_dispo">
            <div v-for="trajet in (trajetsFiltres.length >0 ? trajetsFiltres : trajets)" 
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

                    <!-- Bouton de réservation -->
                    <button v-if="trajet.places_disponibles > 0" 
                            @click="reserver_le_Trajet(trajet)">
                        Réserver
                    </button>
                    <p v-else class="trajet_indisponible">Trajet Indisponible</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import NavBarc from './navBarc.vue';
export default {
    components : {NavBarc},
    data() {
        return {
            first_msg: "Les trajets disponibles",
            trajets: [],
            trajetsFiltres: [], // Trajets correspondant aux critères de recherche
            recherche: {
                depart: "",
                arrivee: "",
                date: ""
            },
        };
    },
    methods: {
        async fetchTrajets() {
            try {
                const response = await axios.post('http://localhost:3000/listetrajet', {} , { withCredentials: true });
                this.trajets = await response.data;
                console.log("Trajets récupérés avec succès:", this.trajets);
                this.trajetsFiltres = this.trajets;
            } catch (error) {
                console.error("Erreur lors de la récupération des trajets:", error);
            }
        },
        rechercherTrajet() {
            const { depart, arrivee, date } = this.recherche;
            axios.post('http://localhost:3000/searchtrajet', {
                depart: depart.toLowerCase(),
                arrivee: arrivee.toLowerCase(),
                date: date
             },{ withCredentials: true })
            .then(response => {
                this.trajetsFiltres = response.data;
                if (this.trajetsFiltres.length === 0) {
                    alert("Aucun trajet trouvé pour les critères de recherche.");
                }
            })
            .catch(error => {
                console.error("Erreur lors de la recherche de trajets:", error);
            });
            
        },


        async reserver_le_Trajet(trajet) {
            if (trajet.places_disponibles > 0) {
                // Mettre à jour le nombre de places disponibles localement
                trajet.places_disponibles -= 1;

                // Créer un objet de réservation
                const reservationData = {
                    id_user: 1, // Remplacez par l'ID de l'utilisateur courant
                    id_trajet: trajet.id
                };
                console.log(reservationData);

                try {
                    // Envoi de la réservation à l'API
                    const response = await axios.post('http://localhost:3000/reserver', reservationData,{ withCredentials: true });
                    console.log(response.status);

                    if (response.status === 200) {
                        alert(`Réservation réussie pour le trajet : ${trajet.lieu_depart} - ${trajet.lieu_arrive}`);
                    }
                    else{
                        alert("Une erreur s'est produite lors de la réservation.");
                    }                    
                } catch (error) {
                    console.error("Erreur lors de la réservation :", error);
                    alert("Vous avez dèja réserver ce trajet.");
                }
            } else {
                alert("Désolé, le trajet est déjà complet");
            }
        }
    },
    computed: {
        trajets_actuels() {
            const today = new Date();
            return this.trajets.filter(trajet => {
                const trajetDate = new Date(`${trajet.date_trajet}T${trajet.heure_depart}`);
                return trajetDate >= today; // ici on garde seulement les réservations futures
            });
        }
    },
    mounted() {
        this.fetchTrajets(); // Appeler la méthode lors du montage du composant
    },
};
</script>

<style scoped>
h2{
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px
}
/* Conteneur principal de la barre */
/* Conteneur principal de la barre */
.search-bar-container {
  position: relative;
  margin-top: 0; /* Pas d'effet de découpe */
  z-index: 100;
  display: flex;
  justify-content: center;
}

/* Style général de la barre */
.search-bar {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 30px; /* Coins arrondis */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 15px;
  width: 90%;
  max-width: 1100px;
  overflow: hidden;
  border: 2px solid rgba(0, 0, 0, 0.1);
}

/* Style des champs d'entrée */
.input-group {
  display: flex;
  align-items: center;
  padding: 0 10px;
  flex: 1;
}

.input-group input {
  border: none;
  outline: none;
  font-size: 16px;
  color: #5a5a5a;
  width: 100%;
  background-color: transparent;
}

.input-group .icon {
  margin-right: 8px;
  font-size: 18px;
  color: #007bff;
}

/* Séparateur entre les champs */
.separator {
  width: 1px;
  height: 30px;
  background-color: #ddd;
  margin: 0 10px;
}

/* Bouton de recherche */
.search-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 25px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex-grow: 1; /* Permet au bouton de prendre tout l'espace disponible */
  text-align: center; /* Centre le texte du bouton */
}

.search-button:hover {
  background-color: #0056b3;
}

/* Supprimer l'icône native de calendrier */
input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
}

.trajets_dispo {
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