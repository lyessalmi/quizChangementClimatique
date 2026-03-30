import { useEffect, useState } from "react"

function AfficherQuiz({quiz}){
    return <p>{quiz && quiz[1].level}</p>
}


export default function Quiz({user}){
    const [quiz, setQuiz] = useState(null);
    // const [scoreLocal, setScoreLocal] = useState(0);
    // if(user) {const [score, setScore] = useState(user.progress.quizUnlocked.quizScore)};

    useEffect(() => {
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
    }, [])

    return (
        <div>
            {user && <AfficherQuiz quiz={quiz} />}
        </div>
    )
} 