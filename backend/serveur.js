const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());


let users = [];
const file_users = path.join(__dirname, "data", "users.json");
if(fs.existsSync(file_users)){
    const data_user = fs.readFileSync(file_users, 'utf-8');
    users = JSON.parse(data_user);
}

let courses = [];
const file_courses = path.join(__dirname, "data", "courses.json");
if(fs.existsSync(file_courses)){
    const data_courses = fs.readFileSync(file_courses, 'utf-8');
    courses = JSON.parse(data_courses);
}


let quiz = [];
const file_quiz = path.join(__dirname, "data", "quiz.json");
if(fs.existsSync(file_quiz)){
    const data_quiz = fs.readFileSync(file_quiz, 'utf-8');
    quiz = JSON.parse(data_quiz);
}


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


app.post('/', (req, res) => {
    const user = req.body;
    const userExist = users.find(u => (u.email === user.email && u.password === user.password));
    if(!userExist){
        return res.status(401).json({ success: false, message: "Identifiants invalides" });
    }
    else {
        const { password, ...userWithoutPassword } = userExist;
        return res.json({ 
            success: true, 
            message: `Bonjour ${userWithoutPassword.username}`, 
            user: userWithoutPassword 
        });
    }
});


app.get('/courses', (req, res) => {
    if(courses) {
        res.json({success : true, message : "Ressources retourvé", courses : courses});
    }
    else {
        res.json({success : false, message : "Ressources non retrouvé"});
    }
});



app.get('/quiz', (req, res) => {
    if(quiz){
        res.json({success : true, message : "Ressources retourvé", quiz : quiz});
    }
    else{
        res.json({success : false, message : "Ressources non retrouvé"});   
    }
})



app.listen(3000, () => {
    console.log("Serveur démarer dans http://localhost:3000/");
});




// J'aimerai que on affiche genre une liste déroulante ou le user peut choisir le niveau qu'il veut jouer
// On affichera toutes les questions avec les choix dans un seul composant, donc sans button suivant.
// Une fois les 10 questions repondu(on va l'obliger genre s'il appuie sur valider et il a pas repondu sur une queeston affiche une messege pour lui dire faux repondre)
// On va donc mettre button valider une fois cliquer, on verifie si a repondu toutes question, si oui on va lui afficher les réponse juste en vert et fausse en rouge. Apres on va faire un setuser avec le levelunlocked à ancienne valeur + 1 , le cours + 1.
// Ensuite on va mettre le localstroage a jour aussi.
// Et pour sauvegarder prgoression on va le faire si le user clique sur le button
