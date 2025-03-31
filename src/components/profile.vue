<template>
    <navBarc/>
    
    <RouterView/>
    <main class="main-content">
            <header class="header">
                <h1>Dashboard</h1>
            </header>
            <section class="content">
                <h2>Liste de vos trajets publiées</h2>
                <TrajetList/>
                <p>{{ error }}</p>
            </section>
            <section class="content">
                <h2>Liste de vos trajets reservés</h2>
                <trajetsReserves/>
                <p>{{ error }}</p>
            </section>
        </main>
      
</template>

<script>
import TrajetForm from './TrajetForm.vue';
import TrajetList from './TrajetListUser.vue';
import navBarc from './navBarc.vue';
import { RouterView } from 'vue-router';
import trajetsReserves from './trajetsReserves.vue';

export default {
   
    data() {
        return {
            trajets: [],
        };
    },
    components: {
        TrajetForm,
        TrajetList,
        navBarc,
        trajetsReserves,
    },
};
</script>

<style scoped>
h1,h2{
    text-align: center;
}
.main-content {
    flex: 1;
    padding: 20px;
}

.header {
    background-color: #ecf0f1;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
}

.content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dashboard-image {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    margin: 20px 0;
}
</style>