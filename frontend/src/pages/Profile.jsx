import { useNavigate } from "react-router-dom"

export default function Profile({user, setUser}){
    const navigate = useNavigate();
    
    function onClick(){
        setUser(null);
        localStorage.removeItem("user");
        navigate('/');

        // Ici on va faire un fetch pour sauvegarder les données une fois que le user à attenint un autre palier niveau qcm
    }


    return (
        <div>
            <img src="https://i.etsystatic.com/50406753/r/il/314979/5977768751/il_fullxfull.5977768751_l6ya.jpg" alt="profile-img"  width={100} height={100}/>
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.progress.courseUnlocked}</span>
            <span>{user.progress.quizLevel}</span>
            <button onClick={onClick}>Se déconnecter</button>
        </div>
    )
} 