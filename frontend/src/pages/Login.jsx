import { Link } from "react-router-dom"
import Navbar from "../components.jsx";

export default function Login({user, setUser}){
    function onSubmit(event){
        event.preventDefault();
        
        fetch("http://localhost:3000/", {
            method: "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                "password" : event.target.password.value,
                "email": event.target.email.value,
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                alert(data.message);
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
            }
            else {
                alert(data.message);
            }
        })
        .catch(err => console.error("Erreur fetch :", err));
    }




    return (
        <>
        <Navbar />
        <div className="login-container">
            <h2 className="login-title">Connexion</h2>

            <form id="form-signup" className="login-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email : </label>
                    <input name="email" type="email" id="email" placeholder="Entrer votre adresse email" required className="form-input" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe : </label>
                    <input name="password" type="password" id="password" placeholder="Entrer votre mot de passe" required className="form-input" />
                </div>

                <button type="submit" className="submit-button">Connexion</button>
                <span className="form-footer">Pas encore de compte ? <Link to="/signup">Inscrivez-vous ici</Link></span>
            </form>
        </div></>
        
    )
} 