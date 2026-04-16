import { Link } from "react-router-dom"

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
        <div>
            <h2>Login</h2>
            
            <form id="form-signup" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">Email : </label>
                        <input name="email" type="email" id="email" placeholder="Enter your email" required />
                </div>

                <div>
                    <label htmlFor="password">Password : </label>
                        <input name="password" type="password" id="password" placeholder="Enter your password" required/>
                </div>

                <button type="submit">Login</button>
                <span>Pas encore de compte ? <Link to="/signup">Inscrivez-vous ici</Link></span>
            </form>
        </div>
    )
} 