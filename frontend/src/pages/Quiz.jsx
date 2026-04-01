import { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


function QuizDisplay({activeQuiz, setActiveQuiz, quiz, user, setUser}){
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    function nextQuestion(){
        if(!selectedOption){
            alert("Veuillez choisir une option");
            return;
        }
        else{
            if(currentQuestion === activeQuiz.questions.length -1){
                if(user.progress.quizUnlocked === activeQuiz.level){
                    if(quiz.length !== activeQuiz.level){
                        const updatedUser = {...user, progress : {courseUnlocked: user.progress.courseUnlocked + 1, quizUnlocked: user.progress.quizUnlocked + 1}};
                        
                        fetch("http://localhost:3000/user/update-progress", {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify({userId: updatedUser.id, progress: updatedUser.progress})})
                        .then(response => response.json())
                        .then(data => localStorage.setItem("user", JSON.stringify(data.user)))
                        .catch(err => console.error("Erreur update:", err));
                        
                        setUser(updatedUser),
                        alert(`Le niveau ${activeQuiz.level + 1} est dévérouillé`);
                    }
                    else{
                        alert("Bravo vous avez terminé le quiz");
                    }
                }
                setActiveQuiz(null);
            }
            else{
                setCurrentQuestion(prev => prev + 1);
                setSelectedOption(null);
            }
        }
    }


    return (
        <div>
            <h2>Niveau {activeQuiz.level}</h2>
            
            <div>
                <p>{activeQuiz.questions[currentQuestion].question}</p>
                {
                    activeQuiz.questions[currentQuestion].options.map((o, index) => {
                        return (
                            <Fragment key={index}>
                                <button onClick={() => setSelectedOption(o)}>{o}</button>
                                <br />
                            </Fragment>
                        )
                    })
                }
                <button onClick={nextQuestion}>Next question</button>
            </div>

            <button onClick={() => setActiveQuiz(null)}>Mes niveaux</button>
        </div>
    )
}


export default function Quiz({user, setUser}){
    const [quiz, setQuiz] = useState([]);
    const [activeQuiz, setActiveQuiz] = useState(null);
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
        user && <div>
            {
                activeQuiz ? (<QuizDisplay activeQuiz={activeQuiz} setActiveQuiz={setActiveQuiz} quiz={quiz} user={user} setUser={setUser} />) : (quiz.slice(0, user.progress.quizUnlocked).map((q) => {
                    return (
                        <Fragment key={q.level}>
                            <button onClick={() => setActiveQuiz(q)}>{q.level}</button>
                        </Fragment>
                    )
                }))
            }
        </div>
    )
}