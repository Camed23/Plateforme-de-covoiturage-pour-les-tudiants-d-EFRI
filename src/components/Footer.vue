<template>
<footer>
    <div class="container">
        <div class="footer-content">
            <h3>Contact Us</h3>
            <p>Email: efreicovoiturage@efrei.fr</p>
            <p>Phone: +121 56556 565556</p>
            <p>Address: 30-32 Avenue de la République Villejuif 94800</p>
        </div>
        <div class="footer-content">
            <h3>Quick Links</h3>
            <ul class="list">
                <li><a href="">Home</a></li>
                <li><a href="">About</a></li>
                <li><a href="">Services</a></li>
                <li><a href="">Products</a></li>
                <li><a href="">Contact</a></li>
            </ul>
        </div>
        <div class="footer-content">
            <h3>Follow Us</h3>
            <ul class="social-icons">
                <li><a href=""><img src="/src/assets/sl_z_072523_61700_05.jpg" alt="Twitter"></a></li>
                <li><a href=""><img src="/src/assets/logo-instagram-svgrepo-com.svg" alt="Instagram"></a></li>
                <li><a href=""><img src="/src/assets/discord-icon-svgrepo-com.svg" alt="Discord"></a></li>
            </ul>
        </div>
    </div>
    <div class="bottom-bar">
        <p>&copy; 2023 Efrei&GO . All rights reserved</p>
    </div>
</footer>
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style scoped>
footer {
    background: #f1f1f1;
    padding-top: 50px;
}

.container {
    max-width: 1140px;
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
}

.footer-content {
    width: 33.3%;
    flex: 1 1 300px;
    text-align: center;
}

h3 {
    font-size: 28px;
    margin-bottom: 15px;
}

.footer-content p {
    padding: 7px;
}

.footer-content ul {
    text-align: center;
    padding: 0;
}

.list {
    padding: 0;
}

.list li {
    list-style-type: none;
    padding: 7px;
    position: relative;
}

.list li::before {
    content: '';
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 100%;
    width: 0;
    height: 2px;
    background: #2a54de;
    transition-duration: 0.5s;
}

.list li:hover::before {
    width: 70px;
}

.social-icons {
    padding: 0;
}

.social-icons li {
    display: inline-block;
    padding: 5px;
}

.social-icons img {
    width: 30px;
    height: 30px;
    transition: transform 0.3s ease, filter 0.3s ease;
    filter: grayscale(100%);
}

.social-icons img:hover {
    transform: scale(1.1);
    filter: grayscale(0%);
}

a {
    text-decoration: none;
    color: #000;
}

a:hover {
    color: #2a54de;
}

.bottom-bar {
    background: #2a54de;
    text-align: center;
    padding: 10px 0;
    margin-top: 50px;
}

.bottom-bar p {
    color: white;
    margin: 0;
    font-size: 16px;
    padding: 7px;
}
</style>
