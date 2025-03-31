<template>
  <navBarc/>
    <form @submit.prevent="ModifierTrajet(id)" class="calculez-vos-economies-en-covoiturage">
      <h2>MODIFIER UN TRAJET</h2>
      <input v-model="date" type="date" required class="input-date-heure" />
      <input v-model="heure" type="time" required class="input-date-heure" />
      <input v-model="lieuDepart" type="text" placeholder="Lieu de départ" required class="input-texte" />
      <input v-model="destination" type="text" placeholder="Destination" required class="input-texte" />
      <input v-model="placesDisponibles" type="number" placeholder="Places disponibles" required class="input-texte" />
      <button type="submit" class="publier-trajet">Modifier Trajet</button>
    </form>
  </template>
  
  <script>
  import axios from 'axios';
  import navBarc from './navBarc.vue'
  export default {
    components : {navBarc},
    data() {
      return {
        date: '',
        heure: '',
        lieuDepart: '',
        destination: '',
        placesDisponibles: '',
        id: 0,
      };
    },
    mounted() {
      const rrid = this.$route.params;
      this.id = rrid.id;
      this.LoadTrajet(this.id);
    },
    methods: {
      async LoadTrajet(id) {
        const response = await axios.post(`http://localhost:3000/Modifier/${id}`,{},{ withCredentials: true });
        this.date = response.data.results[0].date_trajet;
        this.heure = response.data.results[0].heure_depart;
        this.lieuDepart = response.data.results[0].lieu_depart;
        this.placesDisponibles = response.data.results[0].places_disponibles;
        this.destination = response.data.results[0].lieu_arrive;
      },
      async ModifierTrajet(id) {
        try {
          const response = await axios.put(`http://localhost:3000/trajets/${id}`, {
            date: this.date,
            heure: this.heure,
            lieuDepart: this.lieuDepart,
            destination: this.destination,
            placesDisponibles: this.placesDisponibles,
          },{ withCredentials: true });
          this.$router.push(response.data.redirect);
        } catch (error) {
          console.error('Erreur lors de la modification du trajet:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .calculez-vos-economies-en-covoiturage {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    background-color: #f0f8ff; /* Couleur de fond plus douce */
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
    max-width: 400px; /* Largeur maximale pour le formulaire */
    margin: auto; /* Centrer horizontalement */
  }
  
  h2 {
    margin-bottom: 20px;
    color: #063557; /* Couleur du titre */
    font-family: 'Arial', sans-serif; /* Police moderne */
  }
  
  .input-date-heure,
  .input-texte {
    width: 100%; /* Prend toute la largeur disponible */
    padding: 12px;
    margin-bottom: 16px;
    border: 1px solid #446ba5;
    border-radius: 6px;
    font-size: 16px;
    transition: border-color 0.3s ease;
  }
  
  .input-date-heure:focus,
  .input-texte:focus {
    border-color: #063557; /* Couleur de bordure au focus */
    outline: none; /* Enlève le contour par défaut */
  }
  
  .publier-trajet {
    width: 50%; /* Prend toute la largeur disponible */
    padding: 12px;
    background-color: #063557;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .publier-trajet:hover {
    background-color: #0056b3;
    transform: translateY(-2px); /* Léger effet de survol */
  }
  </style>