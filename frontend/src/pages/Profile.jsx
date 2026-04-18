import { useNavigate } from "react-router-dom"

export default function Profile({user, setUser}){
    const navigate = useNavigate();
    const profileSource = user?.source || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6fad3d&color=fff&size=128`;
    const sourceLabel = user?.source ? user.source : "Avatar généré";

    function onClick(){
        setUser(null);
        localStorage.removeItem("user");
        navigate('/');

        // Ici on va faire un fetch pour sauvegarder les données une fois que le user à attenint un autre palier niveau qcm
    }


    return (
        <div className="auth-page">
            <div className="login-container profile-card">
                <img
                    className="profile-avatar"
                    src={profileSource}
                    alt="profile-img"
                    width={100}
                    height={100}
                />
                <h2 className="login-title">Mon profil</h2>

                <div className="profile-row">
                    <span className="profile-label">Nom</span>
                    <strong className="profile-value">{user.name}</strong>
                </div>
                <div className="profile-row">
                    <span className="profile-label">Email</span>
                    <strong className="profile-value">{user.email}</strong>
                </div>
                <div className="profile-row">
                    <span className="profile-label">Cours débloqués</span>
                    <strong className="profile-value">{user.progress.courseUnlocked}</strong>
                </div>
                <div className="profile-row">
                    <span className="profile-label">Niveaux quiz</span>
                    <strong className="profile-value">{user.progress.quizLevel}</strong>
                </div>


                <button className="submit-button" onClick={onClick}>Se déconnecter</button>
            </div>
        </div>
    )
} 