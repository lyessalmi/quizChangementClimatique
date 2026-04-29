// Importation des modules 
const express = require("express"); // Le framework backend pour créer le serveur HTTP
const cors = require("cors");  // Pour autoriser les requêtes entre frontend (React) et backend (Express)
const fs = require("fs"); // Pour lire et écire fichiers.
const path = require("path"); // Pour créer gérer les chemins vers les fichiers

const app = express(); // Création d'un app express

app.use(cors()); // Pour autoriser les requêtes entre frontend (React) et backend (Express)
app.use(express.json()); // Permet de lire les données JSON envoyées dans les requêtes HTTP


// Liste des utilisateurs en mémoire
let users = [];
const file_users = path.join(__dirname, "data", "users.json");
if(fs.existsSync(file_users)){
    const data_user = fs.readFileSync(file_users, 'utf-8');
    users = JSON.parse(data_user); // Conversion du JSON en objet JavaScript
}

// Liste des cours en mémoire
let courses = [];
const file_courses = path.join(__dirname, "data", "courses.json"); // Chemin ves le fichiers couress.json
if(fs.existsSync(file_courses)){
    const data_courses = fs.readFileSync(file_courses, 'utf-8');
    courses = JSON.parse(data_courses);
}


// Liste des quiz
let quiz = [];
const file_quiz = path.join(__dirname, "data", "quiz.json");
if(fs.existsSync(file_quiz)){
    const data_quiz = fs.readFileSync(file_quiz, 'utf-8');
    quiz = JSON.parse(data_quiz);
}


// ROUTE : INSCRIPTION
app.post("/signup", (req, res) => {
    const user = req.body;
    
    if(users.find(u => u.email === user.email || u.username === user.username)) {
        return res.status(409).json({success: false, message: "Le compte existe deja"});
    }
    else {
        users.push({id: Date.now(), ...user});
        fs.writeFileSync(file_users, JSON.stringify(users, null, 2));
        res.json({success : true, message : "Inscription valide"});
    }

});


// ROUTE : LOGIN
app.post('/', (req, res) => {
    const user = req.body;
    const userExist = users.find(u => (u.email === user.email && u.password === user.password));
    if(!userExist){
        return res.status(401).json({ success: false, message: "Identifiants invalides" });
    }
    else {
        const { password, ...userWithoutPassword } = userExist; // On retire le mot de passe avant d'envoyer les données
        return res.json({ 
            success: true, 
            message: `Bonjour ${userWithoutPassword.username}`, 
            user: userWithoutPassword 
        });
    }
});


// ROUTE : RÉCUPÉRATION DES COURS
app.get('/courses', (req, res) => {
    if(courses) {
        res.json({success : true, message : "Ressources retourvé", courses : courses});
    }
    else {
        res.json({success : false, message : "Ressources non retrouvé"});
    }
});


// ROUTE : RÉCUPÉRATION DES QUIZ
app.get('/quiz', (req, res) => {
    if(quiz){
        res.json({success : true, message : "Ressources retourvé", quiz : quiz});
    }
    else{
        res.json({success : false, message : "Ressources non retrouvé"});   
    }
})



// ROUTE : MISE À JOUR PROGRESSION UTILISATEUR
app.put('/user/update-progress', (req, res) => {
    const userId  = req.body.userId;
    const progress = req.body.progress;    
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({success: false,message: "Utilisateur introuvable"});
    }

    users[userIndex].progress = progress;

    fs.writeFileSync(file_users, JSON.stringify(users, null, 2));

    res.json({success: true, message: "Progression mise à jour", user: users[userIndex]});
});


app.listen(3000, () => {
    console.log("Serveur démarer dans http://localhost:3000/");
});