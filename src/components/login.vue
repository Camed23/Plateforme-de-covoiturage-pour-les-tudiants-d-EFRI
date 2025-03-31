<template>
<div class="container">
        <div class="wrapper">
            <div class="banniere">
                <img src="../assets/8489144.jpg" alt="">
            </div>
            <div class="form" @submit.prevent="loginUser">

                <form action="/AuthUser/login" method="post">
                    <h2>Se connecter</h2>
                    <p style="color : red;"> {{ message }}</p>
                    <div>
                        <label >
                            email
                        </label>
                        <input type="email" placeholder="ex :jeanmarie@gmail.com" v-model="email">
                    </div>
                    <div>
                        <label>
                            mot de passe
                        </label>
                        <input type="password" v-model="password"> 
                    </div>
                    <div>
                        <input type="submit" value="Se connecter" id="submit">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

  
import axios from 'axios';
import { useRouter } from 'vue-router';
  
export default{
    name : "login",
   
    data(){
        return {
            email : "",
            password : "",
            message : "",
            route :"",
            success : false
        }
    },
    methods: {
        async loginUser() {
            try {
                const response = await axios.post('http://localhost:3000/AuthUser/login', {
                email: this.email,
                password: this.password,
                }, { withCredentials: true })
                
                
                if (response.data.success) {
                    this.$router.push(response.data.redirect); // Redirecting to the new route
                }
                   
                
            }catch(error){

                this.message = "mot de passe ou email incorrect"
                console.log(error)
            }
        },    
    },
}


</script>

<style scoped>
    .container{
        width: 100%;
    }
    .container .wrapper{
        width: 80%;
        margin: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px #aaa solid;
        border-radius: 10px;
        margin-top: 20px;
    }
    .container .wrapper{
        display: flex;
        flex-direction: row;
    }
    .container .wrapper .banniere{
        width: 50%;
    }

    .container .wrapper .form {
        width: 50%;
    }
    .container .wrapper .form form{
        width: 100%;
    }
    .container .wrapper .form form{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-items: center;
        justify-content: center;
    }
    .container .wrapper .form form .names{
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
    .container .wrapper .form form div{
        width: 100%;
    }
    .container .wrapper .form form div label{
        display: block;
        text-transform: capitalize;
        margin-bottom: 10px;
    }
    .container .wrapper .form form div input{
        width: 100%;
        height: 30px;
        border: 1px #aaa solid;
    }
    #submit{
        background-color: #2566e8;
        color: #fff;
        font-size: 1.2em;
    }
    .container .wrapper .banniere img{
        width: 90%;
        height: 400px;
    }

</style>