import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export default function Quiz({user}){
    const [quiz, setQuiz] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(user){
            fetch("http://localhost:3000/quiz", {method : 'GET'})
            .then(response => response.json())
            .then((data) => {
                if(data.success){
                    setQuiz(data.quiz);
                }
                else{
                    alert(data.message);
                    navigate('/');
                    localStorage.removeItem("user");
                }
            })
            .catch(err => console.error("Erreur fetch :", err));
        }
    }, [user])


    return (
        user && quiz && <div>
            {
                
            }
        </div>
    )
} 


