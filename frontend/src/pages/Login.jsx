import { Link } from "react-router-dom"
import Navbar from "../components";

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
        <div style={{ maxWidth: "40em",maxHeight:"1000px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px",backgroundColor:"#D6F0B7" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px",fontSize:"2em" }}>Connexion</h2>

            <form id="form-signup" onSubmit={onSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="email">Email : </label>
                    <input name="email" type="email" id="email" placeholder="Entrer votre adresse email" required style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="password">Mot de passe : </label>
                    <input name="password" type="password" id="password" placeholder="Entrer votre mot de passe" required style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
                </div>

                <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "5px", backgroundColor: "#E2FFDF", color: "#505E4F", border: "1px solid #3FAE32" }}>Connexion</button>
                <span>Pas encore de compte ? <Link to="/signup">Inscrivez-vous ici</Link></span>
            </form>
        </div></>
        
    )
} 