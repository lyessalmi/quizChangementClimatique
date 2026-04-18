import { useNavigate } from "react-router-dom";

export default function Signup(){
    const navigate = useNavigate();

    
    function onSubmit(event){
        event.preventDefault();

        fetch('http://localhost:3000/signup', {
            method : "POST",
            headers : {"Content-Type" : "application/json"}, 
            body : JSON.stringify({name : event.target.name.value, firstname : event.target.firstname.value, username : event.target.username.value, email : event.target.email.value, password : event.target.password.value, progress: { courseUnlocked: 1, quizUnlocked : 1}}),
        })
        .then(response => response.json())
        .then((data) => {
            alert(data.message);
            navigate("/");
        })
        .catch(err => console.error(err));
    }


    return (
        <div className="auth-page">
            <div className="login-container">
                <h2 className="login-title">Inscription</h2>

                <form id="form-signup" className="login-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nom : </label>
                        <input name="name" type="text" id="name" placeholder="Entrez votre nom" required className="form-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="firstname">Prénom : </label>
                        <input name="firstname" type="text" id="firstname" placeholder="Entrez votre prénom" required className="form-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Nom d'utilisateur : </label>
                        <input name="username" type="text" id="username" placeholder="Choisissez un nom d'utilisateur" required className="form-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email : </label>
                        <input name="email" type="email" id="email" placeholder="Entrez votre adresse email" required className="form-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mot de passe : </label>
                        <input name="password" type="password" id="password" placeholder="Entrez votre mot de passe" required className="form-input" />
                    </div>

                    <button type="submit" className="submit-button">S'inscrire</button>
                </form>
            </div>
        </div>
    )
}