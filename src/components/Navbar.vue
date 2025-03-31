<template>
    <header class="navbar">
      <div class="logo">
        <RouterLink to="/">
        <img src="/src/assets/logo.png" alt="Logo" />
        </RouterLink>
      </div>
      <nav>
        <ul :class="['nav-links', isMenuOpen ? 'active' : '']">
          <li><router-link to="/"><i class="fas fa-home"></i> Accueil</router-link></li>
          <li><router-link to="/AuthUser/sign"><i class="fas fa-user-plus"></i> Inscription</router-link></li>
          <li><router-link to="/apropos"><i class="fas fa-info-circle"></i> À propos</router-link></li>
        </ul>
      </nav>
      <div class="actions">
        <button class="publish-btn"><RouterLink to="/AuthUser/login">Se connecter</RouterLink></button>
        <div class="user-icon">
          <img src="/src/assets/user-icon.png" alt="Utilisateur" />
        </div>
        <div class="hamburger" @click="toggleMenu">
          <i class="fas fa-bars"></i>
        </div>
      </div>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: "Navbar",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>


<style scoped>
/* Navbar container */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #007bff, #0056b3);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 30px;
  height: 100px;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
}

/* Logo styles */
.logo img {
  width: 90px;
  border-radius: 50%;
}

/* Navigation links */
.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
}

.nav-links li {
  font-size: 16px;
  font-weight: bold;
}

.nav-links li a {
  text-decoration: none;
  color: #ffffff;
  position: relative;
  transition: color 0.3s ease-in-out;
}

.nav-links li a::after {
  content: "";
  position: absolute;
  width: 0%;
  height: 2px;
  background: #ffffff;
  bottom: -2px;
  left: 0;
  transition: width 0.3s ease-in-out;
}

.nav-links li a:hover {
  color: #ffdf5d;
}

.nav-links li a:hover::after {
  width: 100%;
}

/* Actions (button and user icon) */
.actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.publish-btn {
  background: linear-gradient(90deg, #007bff, #ff5d5d);
  color: #ffffff;
  border: none;
  padding: 8px 15px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
}

.publish-btn:hover {
  background: linear-gradient(90deg, #ff5d5d, #007bff);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 93, 93, 0.5);
}

/* User icon */
.user-icon img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-icon img:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
}

/* Hamburger menu */
.hamburger {
  display: none;
  cursor: pointer;
}

.hamburger i {
  font-size: 24px;
  color: #ffffff;
}

/* Mobile styles */
@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    background-color: rgba(0, 123, 255, 0.9);
    position: absolute;
    top: 90px;
    right: 0;
    width: 100%;
    padding: 10px 0;
    gap: 15px;
  }

  .nav-links.active {
    display: flex;
  }

  .hamburger {
    display: block;
  }
}
</style>
