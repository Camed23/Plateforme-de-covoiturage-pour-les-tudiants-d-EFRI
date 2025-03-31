<template>
<NavBar/>
<div class="container">
        <div class="wrapper">
            <div class="header"></div>
            <div class="form"  @submit.prevent="registerUser">
                <form method="post">
                    <h2>S'inscrire</h2>
                    <p style="color: red;">{{ message }}</p>
                    <div class="names">
                        <div>
                            <label>
                                nom
                            </label>
                            <input type="text" v-model="nom" pattern="[a-zA-Z0-9 ]{2,30}">
                        </div>
                        <div>
                            <label>
                                prenom
                            </label>
                            <input type="text" v-model="prenom" pattern="[a-zA-Z0-9 ]{2,30}">
                        </div>
                    </div>
                    <div>
                        <label >
                            date de naissance
                        </label>
                        <input type="date" v-model="datenaissance">
                    </div>
                    
                    <div>
                        <label >
                            email
                        </label>
                        <input type="email" placeholder="ex :jeanmarie@gmail.com" v-model="email" pattern="[a-zA-Z0-9-_.]+@[a-zA-Z]+\.[a-zA-Z]{2,}">
                    </div>
                    
                    <div>
                        <label >
                            numero de telephone
                        </label>
                        <input type="tel" placeholder="ex : 6 25 14 78 25" v-model="tel" pattern="[0-9]{9}">
                    </div>
                    
                    <div>
                        <label >
                            mot de passe
                        </label>
                        <input type="password" v-model="password">
                    </div>
                    <div>
                        <label>
                            confirmez son mot de passe
                        </label>
                        <input type="password" v-model="confirmpassword"  @keyup="comparePassword" :style="v1?valid:invalid">
                    </div>

                    <div>
                        <input type="submit" value="s'inscrire" id="submit" >
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import NavBar from './navBar.vue';
export default{
    data : function(){
        return{
            nom :"",
            prenom : "",
            email : "",
            tel :"",
            password : "",
            confirmpassword : "",
            datenaissance : new Date(),

            invalid :"border: 1px red solid;box-shadow: 0px 0px 3px red ;",
            valid : "", 

            v1 : true,
            v2 : true,
            message : ""
        }
    },
    methods : {
        validform(){
            if(this.nom.length ==0 || this.prenom.length ==0 || this.email.length ==0 || this.tel.length ==0 || this.password.length ==0){
                return false;
            }else{
                    if(this.password == this.confirmpassword){
                        return true
                    }else{
                        return false
                    }
                }
            },
            
        
        comparePassword(event){
            this.confirmpassword = event.target.value

       
            if(this.password == this.confirmpassword){
                this.message ='vos deux mot de passe ne corresponde pas '
                this.v1 = true    
            }else{
                console.log(this.v1)
                this.v1 = false       
            }
        },
        verifier() {

            let regex = new RegExp("[a-zA-Z0-9 ]{2,30}")
            let regex2 = new RegExp("[a-zA-Z0-9-_.]+@[a-zA-Z]+\.[a-zA-Z]{2,}")
            let regex3 = new RegExp("[0-9]{9}")

            if(regex.test(this.nom) && regex.test(this.prenom) && regex2.test(this.email)&& regex3.test(this.tel)){
                return true
            }

            return false;
        },
        async registerUser(){
            if(this.validform()){
                if(this.verifier()){
                    try {
                        const response = await axios.post('http://localhost:3000/AuthUser/sign',{
                        nom : this.nom,
                        prenom : this.prenom,
                        email : this.email,
                        tel : this.tel,
                        cpassword : this.password,
                        datenaissance : this.datenaissance,

                    })
                    console.log(response)
                    
                    this.message = response.data
                    alert("Inscription réussi")
                    this.$router.push("/AuthUser/login")
                    

                    }catch(error){

                        this.message = "votre email ou numero de portable existe déja"
                        console.log(error)
                    }
                }else{
                    this.message = "tous vos champs doit être rempli"
                }
            }else{
                this.message = "vos champs sont in valides"
            }
            
        }

    }
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
        border: 1px black solid;
        border-radius: 10px;
        margin-top: 10px;
    }
    .container .wrapper .form{
        width: 100%;
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
    }.container .wrapper .form form div{
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
        outline: none;
    }
    .container .wrapper .form form div input:invalid{
        border: 1px red solid;
        box-shadow: 0px 0px 3px red ;
    }
    #submit{
        background-color: #2566e8;
        color: #fff;
        font-size: 1.2em;
    }

</style>