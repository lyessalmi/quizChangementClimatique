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
        <section className="quiz-card">
            <div className="quiz-card-header">
                <span className="quiz-badge">Niveau {activeQuiz.level}</span>
                <h2 className="quiz-heading">{activeQuiz.title || `Quiz niveau ${activeQuiz.level}`}</h2>
            </div>

            <div className="question-card">
                <p className="question-text">{activeQuiz.questions[currentQuestion].question}</p>
                <div className="options-grid">
                    {activeQuiz.questions[currentQuestion].options.map((o, index) => (
                        <button
                            key={index}
                            type="button"
                            className={selectedOption === o ? "quiz-option selected" : "quiz-option"}
                            onClick={() => setSelectedOption(o)}
                        >
                            {o}
                        </button>
                    ))}
                </div>
                <button className="quiz-action-button" onClick={nextQuestion}>Question suivante</button>
            </div>

            <button className="quiz-action-button secondary" onClick={() => setActiveQuiz(null)}>Mes niveaux</button>
        </section>
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
        user && <main className="quiz-page">
            {activeQuiz ? (
                <QuizDisplay activeQuiz={activeQuiz} setActiveQuiz={setActiveQuiz} quiz={quiz} user={user} setUser={setUser} />
            ) : (
                <section className="quiz-list">
                    <h1 className="quiz-title">quiz</h1>
                    <div className="quiz-grid">
                        {quiz.slice(0, user.progress.quizUnlocked).map((q) => (
                            <button key={q.level} className="quiz-item" onClick={() => setActiveQuiz(q)}>
                                <span>Quizz n° {q.level}</span>
                                <small>{q.title || `Niveau ${q.level}`}</small>
                            </button>
                        ))}
                    </div>
                </section>
            )}
        </main>
    )
}