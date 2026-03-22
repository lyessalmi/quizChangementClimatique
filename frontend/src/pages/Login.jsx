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
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
            
            <form id="form-signup" onSubmit={onSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="email">Email : </label>
                        <input name="email" type="email" id="email" placeholder="Enter your email" required style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="password">Password : </label>
                        <input name="password" type="password" id="password" placeholder="Enter your password" required style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}  />
                </div>

                <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "5px", backgroundColor: "#007bff", color: "white", border: "none" }}>Login</button>
                <span>Pas encore de compte ? <Link to="/signup">Inscrivez-vous ici</Link></span>
            </form>
        </div>
    )
} 