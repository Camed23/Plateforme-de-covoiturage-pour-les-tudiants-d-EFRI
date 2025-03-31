<template>
    <div class="navbar">
        <nav>
            <div class="logo">
                <img src="../assets/car_10962610.png">
                <h2>Efrei&Go</h2>
            </div>
            <div class="items">
                <ul>
                    <li class="item"><RouterLink to="/AuthUser/sign"><a href="#">s'incrire</a></RouterLink></li>
                    <li class="item"><RouterLink to="/AuthUser/login"><a href="#">se connecter</a></RouterLink></li>
                    <li class="item"><a href="#">a propos de nous</a></li>
                </ul>
                <div class="user">
                   <img src="../assets/user_4305588.png"/> 
                </div>
            </div>
            <div class="menu">
                <button @click="menu">
                    &#8659
                </button>
                <ul :style="isActive ? 'display : block;' :'display : none;' ">
                    <li class="item"><RouterLink to="/AuthUser/sign"><a>s'incrire</a></RouterLink></li>
                    <li class="item"><RouterLink to="/AuthUser/login"><a>se connecter</a></RouterLink></li>
                    <li class="item">a propos de nous</li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<style scoped>
    body{
        width: 100%;
        height: 100vh;
        background-size: cover;
    }
    *{
        margin: 0;
        padding: 0;
    }
    .navbar{
        width: 100%;
        background-color: #2566e8;
        height: 70px;
        padding-top: 10px;
        padding-bottom: 20px;
        font-family: 'Franklin Gothic Medium';
    }
    nav{
        width: 80%;
        margin: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .navbar nav .logo {
        display: flex;
        flex-direction: row;
        color: #fff;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 1.5em;
    }
    .navbar nav .logo img{
        width: 100px;
        height: 80px;
    }
    .navbar nav .items{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 30px;
    }
    .navbar nav .menu{
        display: none;
    }
    .navbar nav .menu button{
        font-size: 2em;
        color: #fff;
        background-color: transparent;
        border: none;
    }
    .navbar nav .items ul{
        display: flex;
        flex-direction: row;
        gap: 10px;
        list-style: none;
    } 
    .navbar nav .items ul .item{
        color: #fff;
        font-size: 1.1em;
    }
    .navbar nav .items ul li a{
        color: #fff;
        text-decoration: none;
    }
    .navbar nav .menu ul li a{
        color: #000;
        text-decoration: none;
    }


    .navbar nav .items .user img{
        width: 50px;
        height: 50px;
    }
    @media (max-width: 800px){
        .navbar nav .items{
            display: none;
        }
        .navbar nav .menu{
            display: block;
        }
        .navbar nav .menu ul{
            list-style: none;
            position: fixed;
            display: flex;
            flex-direction: column;
            gap: 10px;
            background-color: #fff;
            right: 20px;
            text-align: center;
            border-radius: 5px;
            color: black;
            padding: 10px;
            display: none;
        }
    }   

</style>
<script>
import { RouterLink } from 'vue-router';
export default{
    data : function(){
            return {
                isActive : false
            }
        },
    methods:{
        
        menu(){
            this.isActive = !this.isActive
        }
    }
}
</script>