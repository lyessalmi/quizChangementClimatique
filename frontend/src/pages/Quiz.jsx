import { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


function QuizDisplay({activeQuiz, setActiveQuiz, quiz, user, setUser}){
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const currentQ = activeQuiz.questions[currentQuestion];
    const isCorrect = selectedOption === currentQ.answer;

    function handleAnswer(){
        if(!selectedOption){
            alert("Veuillez choisir une option");
            return;
        }
        setShowResult(true);
    }

    function nextQuestion(){
        if(currentQuestion === activeQuiz.questions.length - 1){
            if(user.progress.quizUnlocked === activeQuiz.level){
                if(quiz.length !== activeQuiz.level){
                    const updatedUser = {...user, progress : {courseUnlocked: user.progress.courseUnlocked + 1, quizUnlocked: user.progress.quizUnlocked + 1}};
                    
                    fetch("https://quizchangementclimatique.onrender.com/user/update-progress", {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify({userId: updatedUser.id, progress: updatedUser.progress})})
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
            setShowResult(false);
        }
    }

    return (
        <section className="quiz-card">
            <div className="quiz-card-header">
                <span className="quiz-badge">Niveau {activeQuiz.level}</span>
                <h2 className="quiz-heading">{activeQuiz.title || `Quiz niveau ${activeQuiz.level}`}</h2>
            </div>

            <div className="question-card">
                <p className="question-text">{currentQ.question}</p>
                <div className="options-grid">
                    {currentQ.options.map((o, index) => {
                        let optionClass = "quiz-option";
                        
                        if(showResult){
                            if(o === currentQ.answer){
                                optionClass += " correct";
                            }
                            if(selectedOption === o && o !== currentQ.answer){
                                optionClass += " incorrect";
                            }
                        }
                        else if(selectedOption === o){
                            optionClass += " selected";
                        }
                        
                        return (
                            <button
                                key={index}
                                type="button"
                                className={optionClass}
                                onClick={() => !showResult && setSelectedOption(o)}
                                disabled={showResult}
                            >
                                {o}
                            </button>
                        );
                    })}
                </div>
                <button 
                    className="quiz-action-button" 
                    onClick={showResult ? nextQuestion : handleAnswer}
                >
                    {showResult ? "Question suivante" : "Valider"}
                </button>
            </div>

            <button className="quiz-action-button secondary" onClick={() => setActiveQuiz(null)}>Retour au menu</button>
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
                    <h1 className="quiz-title">QUIZ</h1>
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