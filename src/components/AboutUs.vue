<template>
<!-- Barre de navigation -->
<Navbar />
<div class="heading">
    <h1>À propos de nous</h1>
    <p>Notre mission : connecter les voyageurs pour des trajets plus économiques, écologiques et humains. Découvrez notre vision et notre engagement pour un transport collaboratif.</p>
</div>
<div class="container">
    <!-- Section 1 -->
    <section class="about">
        <div class="about-image">
            <img src="/src/assets/ivane-dev.jpg" alt="Photo de notre équipe">
        </div>
        <div class="about-content">
            <h2>Notre mission</h2>
            <p>Chez **Efrei&Go**, nous croyons que le covoiturage peut changer la manière dont nous voyageons. En partageant vos trajets, vous réduisez non seulement vos coûts, mais vous contribuez également à diminuer les émissions de CO₂. Ensemble, nous bâtissons un avenir plus respectueux de l'environnement et renforçons les liens entre les personnes.</p>
            <a href="" class="read-more">En savoir plus</a>
        </div>
    </section>
    
    <!-- Section 2 -->
    <section class="about">
        <div class="about-content">
            <h2>Pourquoi nous choisir ?</h2>
            <p>Notre plateforme est conçue pour être intuitive, sécurisée et pratique. Que vous soyez un conducteur cherchant à partager vos frais de trajet ou un passager souhaitant voyager à moindre coût, **Efrei&Go** simplifie vos déplacements. Grâce à notre système de notation et à nos outils de communication, voyager devient une expérience agréable et sans stress.</p>
            <a href="" class="read-more">En savoir plus</a>
        </div>
        <div class="about-image">
            <img src="https://via.placeholder.com/300x200" alt="Confiance et sécurité">
        </div>
    </section>

    <!-- Section 3 -->
    <section class="about">
        <div class="about-image">
            <img src="https://via.placeholder.com/300x200" alt="Économie partagée">
        </div>
        <div class="about-content">
            <h2>Des trajets économiques</h2>
            <p>Grâce au covoiturage, partagez les frais liés à vos déplacements, tout en optimisant vos trajets. Fini les sièges vides dans les voitures : avec **Efrei&Go**, chaque kilomètre est utile. Économisez de l'argent, partagez de bons moments et réduisez votre empreinte carbone.</p>
            <a href="" class="read-more">En savoir plus</a>
        </div>
    </section>

    <!-- Section 4 -->
    <section class="about">
        <div class="about-content">
            <h2>Notre vision</h2>
            <p>Nous rêvons d'un monde où chaque trajet est une opportunité de rencontre, d'économie et de préservation de l'environnement. Avec **Efrei&Go**, nous ne faisons pas que partager des trajets : nous créons une communauté unie autour de la mobilité durable.</p>
            <a href="" class="read-more">En savoir plus</a>
        </div>
        <div class="about-image">
            <img src="https://via.placeholder.com/300x200" alt="Notre vision">
        </div>
    </section>
</div>
<!-- Section footer -->
<Footer />
</template>

<script>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';

export default {
  name: "AboutUs",
  components: {
    Navbar,
    Footer
  }
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
}

body {
    background: linear-gradient(to bottom, #e6f7ff, #ffffff);
}

.heading {
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin: 20px auto;
}

.heading h1 {
    font-size: 0px;
    color: #000;
    margin-bottom: 25px;
    position: relative;
}

.heading h1::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    display: block;
    margin: 0 auto;
    background-color: rgb(68, 127, 204);
}

.heading p {
    font-size: 18px;
    color: #666;
    margin-bottom: 35px;
}

.container {
    width: 90%;
    margin: 0 auto;
    padding: 10px 20px;
}

.about {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 40px;
}

.about-image {
    flex: 1;
    overflow: hidden;
    max-width: 300px;
}

.about-image img {
    height: auto;
    width: 100%;
    display: block;
    transition: 0.5s ease;
}

.about-image:hover img {
    transform: scale(1.1);
}

.about-content {
    flex: 2;
    padding: 0 20px;
}

.about-content h2 {
    font-size: 22px;
    margin-bottom: 15px;
    color: #333;
}

.about-content p {
    font-size: 17px;
    line-height: 1.6;
    color: #666;
}

.about-content .read-more {
    display: inline-block;
    padding: 10px 20px;
    background-color: #41b8ee;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    border-radius: 25px;
    margin-top: 15px;
    transition: 0.3s ease;
}

.about-content .read-more:hover {
    background-color: #2a75bb;
}

@media screen and (max-width: 768px) {
    .heading {
        padding: 0 20px;
    }

    .heading h1 {
        font-size: 36px;
    }

    .heading p {
        font-size: 17px;
        margin-bottom: 0;
    }

    .container {
        padding: 0;
    }

    .about {
        flex-direction: column;
    }

    .about-image {
        margin-bottom: 20px;
        max-width: 100%;
    }

    .about-content p {
        font-size: 16px;
    }

    .about-content .read-more {
        font-size: 15px;
    }
}
</style>
