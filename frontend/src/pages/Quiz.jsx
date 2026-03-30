import { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


function QuizDisplay({activeQuiz, setActiveQuiz}){
    return (
        <div>
            <h2>Niveau {activeQuiz.level}</h2>

            {
                activeQuiz.questions.map((q, index) => (
                    <div key={index}> 
                        <p>{q.question}</p>
                        {
                            q.options.map((option, i) => (
                                <button key={i}>{option}</button>
                            )) 
                        }

                    </div>
                ))
            }

            <button onClick={() => setActiveQuiz(null)}>Mes niveaux</button>
        </div>
    )
}


export default function Quiz({user}){
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
                activeQuiz ? (<QuizDisplay activeQuiz={activeQuiz} setActiveQuiz={setActiveQuiz} />) : (quiz.slice(0, user.progress.quizUnlocked).map((q) => {
                    return (
                        <Fragment key={q.level}>
                            <button onClick={() => setActiveQuiz(q)}></button>
                        </Fragment>
                    )
                }))
            }
        </div>
    )
}







// import { Fragment, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// // --- COMPOSANT D'AFFICHAGE DU QUIZ (QUESTIONS) ---
// function QuizDisplay({ activeQuiz, setActiveQuiz }) {
//     return (
//         <div style={styles.quizBox}>
//             <button onClick={() => setActiveQuiz(null)} style={styles.backLink}>
//                 ← Changer de niveau
//             </button>
            
//             <div style={styles.quizHeader}>
//                 <h2 style={styles.quizTitle}>Niveau {activeQuiz.level}</h2>
//                 <span style={styles.badge}>{activeQuiz.questions.length} Questions</span>
//             </div>

//             <div style={styles.questionsContainer}>
//                 {activeQuiz.questions.map((q, index) => (
//                     <div key={index} style={styles.questionCard}>
//                         <p style={styles.questionText}>
//                             <span style={styles.questionNumber}>{index + 1}.</span> {q.question}
//                         </p>
//                         <div style={styles.optionsGrid}>
//                             {q.options.map((option, i) => (
//                                 <button key={i} style={styles.optionButton}>
//                                     {option}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <button onClick={() => setActiveQuiz(null)} style={styles.finishButton}>
//                 Valider mes réponses
//             </button>
//         </div>
//     );
// }

// // --- COMPOSANT PRINCIPAL ---
// export default function Quiz({ user }) {
//     const [quizList, setQuizList] = useState([]);
//     const [activeQuiz, setActiveQuiz] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (user) {
//             fetch("http://localhost:3000/quiz", { method: 'GET' })
//                 .then(response => response.json())
//                 .then((data) => {
//                     if (data.success) {
//                         setQuizList(data.quiz);
//                     } else {
//                         alert(data.message);
//                         navigate('/');
//                         localStorage.removeItem("user");
//                     }
//                 })
//                 .catch(err => console.error("Erreur fetch :", err));
//         }
//     }, [user, navigate]);

//     // Gestion du changement de niveau via le select
//     const handleSelectLevel = (e) => {
//         const levelId = e.target.value;
//         const selected = quizList.find(q => q.level.toString() === levelId);
//         setActiveQuiz(selected);
//     };

//     return (
//         user && (
//             <div style={styles.wrapper}>
//                 <div style={styles.container}>
//                     {!activeQuiz && (
//                         <div style={styles.selectionCard}>
//                             <h1 style={styles.pageTitle}>Entraînement & Quiz</h1>
//                             <p style={styles.instruction}>Sélectionnez un niveau débloqué pour commencer :</p>
                            
//                             <select 
//                                 onChange={handleSelectLevel} 
//                                 style={styles.selectDropdown}
//                                 defaultValue=""
//                             >
//                                 <option value="" disabled>--- Choisir un niveau ---</option>
//                                 {quizList.slice(0, user.progress.quizUnlocked).map((q) => (
//                                     <option key={q.level} value={q.level}>
//                                         Niveau {q.level}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     )}

//                     {activeQuiz && (
//                         <QuizDisplay activeQuiz={activeQuiz} setActiveQuiz={setActiveQuiz} />
//                     )}
//                 </div>
//             </div>
//         )
//     );
// }

// // --- DESIGN GÉNÉRIQUE ET MODULABLE ---
// const styles = {
//     wrapper: { 
//         padding: '40px 20px', 
//         backgroundColor: '#f8f9fa', 
//         minHeight: '100vh', 
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" 
//     },
//     container: { maxWidth: '800px', margin: '0 auto' },
    
//     // Écran de sélection
//     selectionCard: {
//         backgroundColor: '#fff',
//         padding: '40px',
//         borderRadius: '20px',
//         textAlign: 'center',
//         boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
//     },
//     pageTitle: { color: '#2d3436', marginBottom: '10px' },
//     instruction: { color: '#636e72', marginBottom: '30px' },
//     selectDropdown: {
//         width: '100%',
//         maxWidth: '400px',
//         padding: '12px 15px',
//         borderRadius: '10px',
//         border: '2px solid #dfe6e9',
//         fontSize: '1rem',
//         color: '#2d3436',
//         outline: 'none',
//         cursor: 'pointer',
//         backgroundColor: '#fff'
//     },

//     // Vue du Quiz
//     quizBox: { animation: 'fadeIn 0.4s ease' },
//     backLink: { 
//         background: 'none', border: 'none', color: '#0984e3', 
//         fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px' 
//     },
//     quizHeader: { 
//         display: 'flex', justifyContent: 'space-between', 
//         alignItems: 'center', marginBottom: '30px' 
//     },
//     quizTitle: { margin: 0, color: '#2d3436' },
//     badge: { 
//         backgroundColor: '#55efc4', color: '#00b894', 
//         padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' 
//     },

//     // Questions
//     questionsContainer: { display: 'flex', flexDirection: 'column', gap: '20px' },
//     questionCard: {
//         backgroundColor: '#fff',
//         padding: '25px',
//         borderRadius: '15px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
//         border: '1px solid #f1f2f6'
//     },
//     questionNumber: { color: '#0984e3', fontWeight: 'bold', marginRight: '8px' },
//     questionText: { fontSize: '1.1rem', fontWeight: '600', color: '#2d3436', marginBottom: '20px' },
//     optionsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
//     optionButton: {
//         padding: '12px',
//         borderRadius: '8px',
//         border: '1px solid #dfe6e9',
//         backgroundColor: '#fdfdfd',
//         textAlign: 'left',
//         cursor: 'pointer',
//         transition: 'all 0.2s',
//         color: '#2d3436'
//     },

//     finishButton: {
//         marginTop: '40px',
//         width: '100%',
//         padding: '15px',
//         borderRadius: '12px',
//         border: 'none',
//         backgroundColor: '#00b894',
//         color: '#fff',
//         fontSize: '1.1rem',
//         fontWeight: 'bold',
//         cursor: 'pointer',
//         boxShadow: '0 4px 15px rgba(0, 184, 148, 0.3)'
//     }
// };