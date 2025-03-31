<template>
<div class="homepage">      
  <!-- Barre de navigation -->
   <Navbar />
   <!-- Section principale avec une image de fond -->
    <div class="hero-section">
      <h1>Payez-vous des fous rires, pas des péages</h1>
    </div>
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
        <button class="search-button">Rechercher</button>
      </div>
    </div>

    <!-- Section d'information -->
     <section class="info-section">
      <h2>Découvrez Efrei Covoiturage, et facilitez vous le transport avec le covoiturage </h2>
      <p>
        Vous vous rendez au travail, à la salle de sport ou à l'école ?
        Économisez encore plus en covoiturant avec Efrei Covoiturage, notre application pour tous vos trajets au quotidien.
        Profitez de nombreux avantages, dont 100 € de Prime Covoiturage.
      </p>
    </section>

    <section class="body-wrap">
    <div class="wrapper">
      <img src="/src/assets/image1.jpg" alt="Covoiturage">
      <div class="text-box">
        <h2>Profiter des évènements à Efrei sans tracas avec les transports Efrei&GO !</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore, dicta nulla iure fugiat tempore ipsum expedita eius, reiciendis cupiditate id illum atque voluptas ipsam enim dolor vero natus sapiente! Iure et atque explicabo at distinctio optio rem impedit obcaecati modi blanditiis in voluptatum est quaerat repellendus, molestias possimus eaque officia?</p>
        <button class="btn">Voir les trajets</button>
      </div>
    </div>
    </section>

    <!--Section footer-->
    <Footer></Footer>
    </div>
</template>
  
<script>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
export default {
  name: "Home",
  components: {
    Navbar,
    Footer
  }
};
</script>
  
<style scoped>
/* Styles généraux */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

h1, h2, h3, p {
  margin: 0;
}
  
/* Section principale */
.hero-section {
  background-image: url("/src/assets/bg-image.jpeg");
  background-size: cover;
  background-position: center;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}
  
.hero-section h1 {
  font-size: 2.5rem;
  margin: 0;
}
  
  /* Section d'information */
.info-section {
  padding: 50px 20px;
  text-align: center;
  background-color: #fff;
  margin-top: -30px;
}
  
.info-section h2 {
  font-size: 1.8rem;
  color: #007bff;
  margin-bottom: 20px;
}
  
.info-section p {
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
}

/* Conteneur principal de la barre */
/* Conteneur de la barre avec effet découpe */
.search-bar-container {
  position: relative;
  margin-top: -50px; /* Découpe sur l'image */
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
}

.search-button:hover {
  background-color: #0056b3;
}

/* Supprimer l'icône native de calendrier */
input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
}

/*Partie image et text */
.body-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(35 170 242 / 97%);
  padding: 20px;
  height: auto; /* Suppression de la hauteur fixe */
}

.wrapper {
  display: flex;
  flex-wrap: nowrap; /* Désactive le retour à la ligne */
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  gap: 20px;
}

img {
  width: 35%; /* L'image occupe la moitié de la largeur */
  height: auto; /* Ajuste automatiquement la hauteur */
  border: 3px solid #fff;
  border-radius: 10px;
  flex-shrink: 0; /* Empêche l'image de rétrécir */
}

.text-box {
  flex: 1; /* Le texte occupe l'espace restant */
  color: #fff;
  text-align: left;
  padding: 0 15px; /* Ajoute un espacement interne */
}

.text-box h2 {
  font-size: 2rem;
  margin-bottom: 15px;
}

.text-box p {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 20px;
}

.btn {
  display: inline-block;
  background-color: #fff;
  color: rgb(35 170 242 / 97%);
  border: 3px solid rgb(35 170 242 / 97%);
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

/* Responsive pour les écrans plus petits */
@media (max-width: 768px) {
  .wrapper {
    flex-direction: column; /* Passe en colonne */
    align-items: center; /* Centre les éléments */
    text-align: center;
  }

  img {
    width: 90%; /* L'image occupe presque toute la largeur sur mobile */
    margin-bottom: 15px; /* Ajoute un espacement */
  }

  .text-box {
    width: 100%; /* Le texte occupe toute la largeur */
    padding: 0; /* Supprime les marges latérales */
  }
}

</style>
  