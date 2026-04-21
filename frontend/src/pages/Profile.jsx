import { useNavigate } from "react-router-dom"

export default function Profile({user, setUser}){
    const navigate = useNavigate();
    
    function onClick(){
        setUser(null);
        localStorage.removeItem("user");
        navigate('/');
    }


    return (
        <div>
            <img src={user.profileImg} alt="profile-img"/>
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.progress.courseUnlocked}</span>
            <span>{user.progress.quizLevel}</span>
            <button onClick={onClick}>Se déconnecter</button>
        </div>
    )
} 