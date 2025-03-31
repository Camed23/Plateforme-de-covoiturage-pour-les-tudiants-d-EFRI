<template>
    <div class="container">
        <aside class="sidebar">
            <h2>Menu</h2>
            <ul>
                <li>Dashboard</li>
                <li>Reports</li>
                <li>Settings</li>
                <li>Profile</li>
                <li><button @click="logout">logout</button></li>
            </ul>
        </aside>
        <main class="main-content">
            <header class="header">
                <h1>Dashboard</h1>
            </header>
            <section class="content">
                <h2>Welcome to your Dashboard!</h2>
                <img src="https://via.placeholder.com/600x300" alt="Dashboard Image" class="dashboard-image">
                <p>This is a simple dashboard layout with a sidebar and main content area.</p>
                <button @click="fetchUsers">click</button>
                <p>{{ error }}</p>
            </section>
        </main>
    </div>
</template>
<script>
import axios from 'axios';
export default{
    name : "home",
    data : function(){
        return{
            users :"",
            error : ""
        }
    },
    mounted(){
        this.fetchUsers()
    },
    methods : {
        async fetchUsers() {
            try {
                const response = await axios.post('http://localhost:3000/home',{}, { withCredentials: true })
                if(response.data.success){
                    this.$router.push(response.data.redirect)
                }
            } catch (err) {
                this.error = 'Erreur lors de la récupération des utilisateurs'; // Gérer les erreurs
                console.log(err)
            }
        },

        async logout() {
            try {
                const response = await axios.post('http://localhost:3000/logout',{}, { withCredentials: true })
                if (response.data.success) {
                    this.$router.push(response.data.redirect); // Redirecting to the new route
                }
            } catch (err) {
                // Gérer les erreurs
                console.log(err)
            }
        }
    }
}
</script>

<style scoped>
* {
box-sizing: border-box;
margin: 0;
padding: 0;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
}

.container {
    display: flex;
    height: 100vh;
}

.sidebar {
    width: 250px;
    background-color: #2c3e50;
    color: white;
    padding: 20px;
}

.sidebar h2 {
    text-align: center;
}

.sidebar ul {
    list-style: none;
    padding: 0;
}

.sidebar ul li {
    padding: 10px;
    text-align: center;
    cursor: pointer;
}

.sidebar ul li:hover {
    background-color: #34495e;
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