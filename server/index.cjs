const express = require('express'); /*express : Framework Node.js pour créer des applications et des
API web.*/
const mysql = require('mysql2');
const cors = require('cors'); /*cors : Middleware pour gérer les politiques CORS (Cross-Origin
Resource Sharing), permettant à d'autres domaines (ici localhost:5173) d'accéder aux ressources du
serveur.*/
const app = express();//mysql2 : Package pour se connecter à une base de données MySQL.
const app2 =express()
const port = 3000;// Le serveur est configuré pour écouter sur le port 3000
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // Middleware pour analyser le corps des requêtes
// Middleware pour servir des fichiers statiques
app.use(express.static(path.join(__dirname, '..'))); // Chemin vers le dossier dist de Vue.js

// Route pour servir l'application Vue.js
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.use(express.urlencoded({ extended: true }));

// Middleware pour parser le corps des requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const bcrypt = require('bcrypt');

// Configuration de la session
app.use(session({
    secret: 'votre_secret', // Changez cela pour une valeur secrète
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Mettez à true si vous utilisez HTTPS
  }));


  app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow DELETE requests
    credentials: true // If you need to send cookies
  }));


app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Remplacez par votre mot de passe
    database: 'covoiturage', // Nom de la base de données
});
// connection à la base de donnée

db.connect(err => {
if (err) throw err;
    console.log('Connecté à la base de données MySQL');
});

app.post('/AuthUser/sign', async (req, res) => {
    const { nom, prenom,datenaissance,email,cpassword,tel } = req.body;
    const sel = await bcrypt.genSalt(10); // 10 est le nombre de rounds
        // Hacher le mot de passe avec le sel
    const hashedPassword = await bcrypt.hash(cpassword, sel); // Hash the password
    const query = 'INSERT INTO `users` (`nom`, `prenom`, `datenaissance`, `tel`, `email`, `password`) VALUES (?,?,?,?,?,?)';
    db.query(query, [nom, prenom,datenaissance,tel,email,hashedPassword], (err) => {
        if (err) {
            console.error('Erreur lors de l\'insertion :', err);
            return res.status(500).send('Erreur lors de l\'inscription');
        }
        res.send('Utilisateur inscrit');
    });
});


app.post('/AuthUser/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Login error:', err);
            return res.status(500).send('Error during login');
        }

        if (results.length > 0) {
            
            const user = results[0];
            const isMatch = await bcrypt.compare(password,user.password); // Compare hashed password
            console.log(isMatch)

            if (isMatch) {
                req.session.user = user.id_user; // Store user in session
                console.log(user.id_user)

                return res.send({ redirect: '/profile', success: true });
            }
        }
        res.status(401).send('Login failed: Incorrect email or password');
    });
});

// Middleware pour vérifier si l'utilisateur est connecté
function verifySession(req, res, next) {
    if (req.session.user) {
        next(); // L'utilisateur est connecté, continue
    } else {
        res.send({success :true, redirect :"AuthUser/sign"})
    }
}

// Route de déconnexion
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Erreur lors de la déconnexion");
        }

        res.send({redirect :'/AuthUser/login',success :true})
    });
});


// Publier un trajet
app.post('/TrajetForm',verifySession, (req, res) => {
    const { date, heure, lieuDepart, destination, placesDisponibles } = req.body;
    const id_user = req.session.user
    // Validation des données
    if (!date || !heure || !lieuDepart || !destination || placesDisponibles === undefined) {
        return res.status(400).send('Tous les champs sont requis.');
    }
    const query = 'INSERT INTO trajet (`lieu_depart`, `lieu_arrive`, `heure_depart`, `date_trajet`, `places_disponibles`, `id_user`) VALUES (?, ?, ?, ?, ?,?)';
    db.query(query, [lieuDepart, destination,heure, date,  placesDisponibles,id_user], (err) => {
        if (err) {
            console.error('Erreur lors de l insertion:', err); // Log l'erreur pour le débogage
            return res.status(500).send('Erreur lors de la publication du trajet');
        }
        res.status(201).send('Trajet publié avec succès');
    });
});

// Récupérer tous les trajets
app.post('/trajets/:id',verifySession, (req, res) => {
    const id = req.session.user
    const query = 'SELECT * FROM trajet WHERE id_user=?';
    db.query(query,[id] ,(err, results) => {
        if (err) {
            console.error(err); // Log l'erreur pour le débogage
            return res.status(500).send('Erreur lors de la récupération des trajets');
        }
        res.send({results : results});
    });
});

app.post('/Modifier/:id',verifySession, (req, res) => {
    const { id } = req.params;
    
    const query = 'SELECT * FROM trajet WHERE id = ?';
    db.query(query,[id], (err,results) => {
        if (err) {
            console.error(err); // Log l'erreur pour le débogage
            return res.status(500).send('Erreur lors de la récupération des trajets');
        }
        res.send({results : results});
    });
});


app.post('/reservations', verifySession ,(req, res) => {
    const id  = req.session.user;

    const query = 'SELECT * FROM trajet JOIN reserver ON trajet.id = reserver.id WHERE reserver.id_user = ?';
    db.query(query,[id], (err,results) => {
        if (err) {
            console.error(err); // Log l'erreur pour le débogage
            return res.status(500).send('Erreur lors de la récupération des trajets');
        }
        res.send({results : results});
    });
});


/**************************************** */
app.delete('/reservations/:id', (req, res) => {
    const { id } = req.params;
    const id_user  = req.session.user;
    const query = 'DELETE FROM `reserver` WHERE `id_user` =? AND `id` =?';
    db.query(query,[id_user,id], (err) => {
        if (err) {
            console.error(err); // Log l'erreur pour le débogage
            return res.status(500).send('Erreur lors de la récupération des trajets');
        }
        console.log("reservation annulé")
        res.status(200).send("reservation annulé");
    });

    // Mettre à jour le nombre de places disponibles


    db.query('UPDATE trajet SET places_disponibles = places_disponibles + 1 WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Erreur lors de la mise à jour des places disponibles :', err);
            return res.status(500).send('Erreur lors de la mise à jour des places disponibles');
        }
    });
});


// Supprimer un trajet
app.delete('/trajets/:id',(req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM trajet WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error(err); // Log l'erreur pour le débogage
            return res.status(500).send('Erreur lors de la suppression du trajet');
        }
        res.send('Trajet supprimé avec succès');
    });
});


// Modifier un trajet
app.put('/trajets/:id', verifySession,(req, res) => {
    const { id } = req.params;
    const { date, heure, lieuDepart, destination, placesDisponibles } = req.body;
    console.log(id)
    const query = 'UPDATE `trajet` SET `lieu_depart`=?,`lieu_arrive`=?,`heure_depart`=?,`date_trajet`=?,`places_disponibles`=? WHERE `id`=?';
    
    db.query(query, [lieuDepart, destination,heure, date,  placesDisponibles,id], (err) => {
        if (err) {
            console.error(err); // Log l'erreur pour le débogage
            return res.status(500).send('Erreur lors de la modification du trajet');
        }
        res.send({redirect : '/profile'});
    });
});

// Charger et parser le fichier CSV
const loadJSONData = () => {
    const jsonData = fs.readFileSync('server/france.json', 'utf8');
    return JSON.parse(jsonData);
};

// Route pour les suggestions
app.get('/suggestions', (req, res) => {
    const query = req.query.query || '';
    const communes = loadJSONData();
    
    // Filtrer les communes en fonction de la requête
    const suggestions = communes.filter(commune => 
        commune.Nom_commune.toLowerCase().includes(query.toLowerCase())
    ).map(commune => commune.Nom_commune);
    
    res.json(suggestions);
})

// Route pour récupérer les trajets
app.post('/listetrajet',verifySession, (req, res) => {
    db.query('SELECT * FROM trajet ', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


// Route POST pour enregistrer une réservation
app.post('/reserver', verifySession ,(req, res) => {
    const { id_user, id_trajet } = req.body;
    
    id = req.session.user
    console.log(id_user)
    // D'abord, vérifiez le nombre de places disponibles pour le trajet
    db.query('SELECT places_disponibles FROM trajet WHERE id = ?', [id_trajet], (err, results) => {
        if (err) {
            console.error('Erreur lors de la vérification des places disponibles :', err);
            return res.status(500).send('Erreur lors de la vérification des places disponibles');
        }

        if (results.length > 0) {
            const placesDisponibles = results[0].places_disponibles;
            if (placesDisponibles > 0) {
                // Réserver le trajet
                const query = 'INSERT INTO reserver (id_user, id) VALUES (?, ?)';
                db.query(query, [id, id_trajet], (err) => {
                    if (err) {
                        console.error('Erreur lors de l\'insertion de la réservation :', err);
                        return res.status(500).send('Erreur lors de la réservation');
                    }

                    // Mettre à jour le nombre de places disponibles
                    db.query('UPDATE trajet SET places_disponibles = places_disponibles - 1 WHERE id = ?', [id_trajet], (err) => {
                        if (err) {
                            console.error('Erreur lors de la mise à jour des places disponibles :', err);
                            return res.status(500).send('Erreur lors de la mise à jour des places disponibles');
                        }

                        res.send('Réservation enregistrée avec succès');
                    });
                });
            } else {
                return res.status(400).send('Désolé, le trajet est déjà complet');
            }
        } else {
            return res.status(404).send('Trajet non trouvé');
        }
    });
});

app.post('/searchtrajet', verifySession,(req, res) => {
    const { depart, arrivee, date } = req.body;
    const query = `
        SELECT * FROM trajet 
        WHERE LOWER(lieu_depart) LIKE ? 
        AND LOWER(lieu_arrive) LIKE ? 
        AND date_trajet = ?`;

    db.query(query, [`%${depart}%`, `%${arrivee}%`, date], (err, results) => {
        if (err) {
            console.error('Erreur lors de la recherche de trajets :', err);
            return res.status(500).send('Erreur lors de la recherche de trajets');
        }
        res.json(results);
    });
});

// Route GET pour récupérer les trajets futurs
app.get('/trajets-futurs', (req, res) => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // Récupère la date au format YYYY-MM-DD

    const query = 'SELECT * FROM trajet WHERE date_trajet > ?';
    db.query(query, [todayString], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des trajets futurs :', err);
            return res.status(500).send('Erreur lors de la récupération des trajets futurs');
        }
        res.json(results);
    });
});


app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});


