<template>
    <navBarc/>
    <div class="form-container">
        <h2>Calculez vos économies en covoiturage</h2>
        <form @submit.prevent="publierTrajet" class="trajet-form">
            <input v-model="date" type="date" class="form-input" required />
            <input v-model="heure" type="time" class="form-input" required />
            <input
                v-model="lieuDepart"
                type="text"
                placeholder="Lieu de départ"
                class="form-input"
                @input="fetchSuggestions"
                required
            />
            <ul v-if="suggestions.length > 0" class="suggestions-list">
                <li
                    v-for="suggestion in suggestions"
                    :key="suggestion"
                    @click="selectSuggestion1(suggestion)"
                    class="suggestion-item"
                >
                    {{ suggestion }}
                </li>
            </ul>
 
            <input
                v-model="destination"
                type="text"
                placeholder="Destination"
                class="form-input"
                @input="fetchSuggestions2"
                required
            />
            <ul v-if="suggestions2.length > 0" class="suggestions-list">
                <li
                    v-for="suggestion in suggestions2"
                    :key="suggestion"
                    @click="selectSuggestion2(suggestion)"
                    class="suggestion-item"
                >
                    {{ suggestion }}
                </li>
            </ul>
 
            <input
                v-model="placesDisponibles"
                type="number"
                placeholder="Places disponibles"
                class="form-input"
                required
            />
            <button type="submit" class="submit-button">Publier Trajet</button>
        </form>
    </div>
</template>
 
<script>
import axios from 'axios';
import navBarc from './navBarc.vue';
 
export default {
    components : {navBarc},
    data() {
        return {
            date: '',
            heure: '',
            lieuDepart: '',
            destination: '',
            placesDisponibles: '',
            query: '',
            suggestions: [],
            suggestions2: [],
            list: ""
        };
    },
    methods: {
        async publierTrajet() {
            await axios.post('http://localhost:3000/TrajetForm', {
                date: this.date,
                heure: this.heure,
                lieuDepart: this.lieuDepart,
                destination: this.destination,
                placesDisponibles: this.placesDisponibles,
            },{ withCredentials: true });
            this.resetForm();
        },
        resetForm() {
            this.date = '';
            this.heure = '';
            this.lieuDepart = '';
            this.destination = '';
            this.placesDisponibles = '';
        },
        async fetchSuggestions() {
            if (this.lieuDepart.length < 4) {
                this.suggestions = [];
                return;
            }
            fetch(`http://localhost:3000/suggestions?query=${this.lieuDepart}`)
                .then(response => response.json())
                .then(data => {
                    this.suggestions = data;
                });
        },
        fetchSuggestions2() {
            if (this.destination.length < 4) {
                this.suggestions2 = [];
                return;
            }
            fetch(`http://localhost:3000/suggestions?query=${this.destination}`)
                .then(response => response.json())
                .then(data => {
                    this.suggestions2 = data;
                });
        },
        selectSuggestion1(suggestion) {
            this.lieuDepart = suggestion;
            this.suggestions = [];
        },
        selectSuggestion2(suggestion) {
            this.destination = suggestion;
            this.suggestions2 = [];
        }
    }
};
</script>
 
<style scoped>
/* Container for the entire form */
.form-container {
    background-color: #d2dff4;
    padding: 30px 50px;
    max-width: 400px;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-top: 30px;
}
 
/* Form title */
.form-container h2 {
    color: #00487c;
    margin-bottom: 20px;
    font-size: 1.5rem;
}
 
/* Inputs */
.form-input {
    display: block;
    width: 90%;
    padding: 10px 15px;
    margin-bottom: 15px;
    border: 1px solid #d1d5db;
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
    background-color: #ffffff;
}
 
.form-input:focus {
    border-color: #00487c;
    box-shadow: 0 0 4px rgba(0, 72, 124, 0.3);
}
 
/* Suggestions list */
.suggestions-list {
    border: 1px solid #d1d5db;
    border-radius: 5px;
    background-color: white;
    max-height: 150px;
    overflow-y: auto;
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    width: calc(100% - 40px);
    z-index: 10;
}
 
.suggestion-item {
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #d1d5db;
}
 
.suggestion-item:last-child {
    border-bottom: none;
}
 
.suggestion-item:hover {
    background-color: #e8f1fc;
    color: #00487c;
}
 
/* Submit button */
.submit-button {
    background-color: #00487c;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    width: 100%;
    text-transform: uppercase;
    margin-top: 20px;
}
 
.submit-button:hover {
    background-color: #005fa1;
}
</style>
 