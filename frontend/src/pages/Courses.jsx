import { useNavigate } from "react-router-dom"
import {Fragment, useEffect, useState } from "react";


function CourseDisplay({activeCourse, setActiveCourse}){
    return (
        <div>
            <h2>{activeCourse.title}</h2>
            {<img src={activeCourse.image} alt="img" />}
            <p>{activeCourse.content.intro}</p>
            {
                activeCourse.content.sections.map((s, index) => (
                    <Fragment key={index}>
                        <h3>{s.subTitle}</h3>
                        <p>{s.text}</p>
                    </Fragment>
                ))
            }
            <button onClick={() => setActiveCourse(null)}>Mes cours</button>
        </div>
    )
}


export default function Courses({user}){
    const [courses, setCourses] = useState([]);
    const [activeCourse, setActiveCourse] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        if(user){
            fetch(`http://localhost:3000/courses`, {method : 'GET'})
            .then((response) => response.json())
            .then((data) => {
                if(data.success){
                    setCourses(data.courses);
                }
                else{
                    alert(data.message);
                    navigate('/');
                    localStorage.removeItem("user");
                }
            }) 
            .catch(err => console.error("Erreur fetch :", err));
        }
    }, [user]);


    return (
        user && <div>
            {
                activeCourse ? (<CourseDisplay  activeCourse={activeCourse} setActiveCourse={setActiveCourse} />) : (courses.slice(0, user.progress.courseUnlocked).map((c) => {
                    return (
                        <Fragment key={c.id}>
                            <img src={c.image} alt={"Image sur le " + c.title}  onClick={() => setActiveCourse(c)}/>
                            <br />
                        </Fragment>
                    )
                }))
            }
        </div>
    )
} 




// import { useNavigate } from "react-router-dom";
// import { Fragment, useEffect, useState } from "react";

// // --- COMPOSANT DE DÉTAIL DU COURS ---
// function CourseDisplay({ activeCourse, setActiveCourse }) {
//     return (
//         <div style={styles.detailContainer}>
//             <button onClick={() => setActiveCourse(null)} style={styles.backButton}>
//                 ← Retour aux cours
//             </button>
            
//             <h2 style={styles.mainTitle}>{activeCourse.title}</h2>
            
//             {activeCourse.image && (
//                 <img src={activeCourse.image} alt={activeCourse.title} style={styles.detailImage} />
//             )}
            
//             <div style={styles.contentBox}>
//                 <p style={styles.introText}>{activeCourse.content.intro}</p>
                
//                 {activeCourse.content.sections.map((s, index) => (
//                     <Fragment key={index}>
//                         <h3 style={styles.subTitle}>{s.subTitle}</h3>
//                         <p style={styles.sectionText}>{s.text}</p>
//                     </Fragment>
//                 ))}
//             </div>
            
//             <button onClick={() => setActiveCourse(null)} style={styles.bottomButton}>
//                 Terminer la lecture
//             </button>
//         </div>
//     );
// }

// // --- COMPOSANT PRINCIPAL ---
// export default function Courses({ user }) {
//     const [courses, setCourses] = useState([]);
//     const [activeCourse, setActiveCourse] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (user) {
//             fetch(`http://localhost:3000/courses`, { method: 'GET' })
//                 .then((response) => response.json())
//                 .then((data) => {
//                     if (data.success) {
//                         setCourses(data.courses);
//                     } else {
//                         alert(data.message);
//                         navigate('/');
//                         localStorage.removeItem("user");
//                     }
//                 })
//                 .catch(err => console.error("Erreur fetch :", err));
//         }
//     }, [user, navigate]);

//     return (
//         <div style={styles.wrapper}>
//             <div style={styles.container}>
//                 {!activeCourse && <h1 style={styles.pageTitle}>Mes Formations</h1>}

//                 {user && (
//                     activeCourse ? (
//                         <CourseDisplay activeCourse={activeCourse} setActiveCourse={setActiveCourse} />
//                     ) : (
//                         <div style={styles.grid}>
//                             {courses.slice(0, user.progress.courseUnlocked).map((c) => (
//                                 <div key={c.id} style={styles.card} onClick={() => setActiveCourse(c)}>
//                                     <div style={styles.imageWrapper}>
//                                         <img 
//                                             src={c.image} 
//                                             alt={c.title} 
//                                             style={styles.cardImage} 
//                                         />
//                                     </div>
//                                     <div style={styles.cardInfo}>
//                                         <span style={styles.badge}>Module {c.id}</span>
//                                         <h4 style={styles.cardTitle}>{c.title}</h4>
//                                         <p style={styles.cardFooter}>Cliquez pour commencer →</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )
//                 )}
//             </div>
//         </div>
//     );
// }

// // --- SYSTÈME DE DESIGN (Facile à modifier) ---
// const styles = {
//     wrapper: { 
//         padding: '40px 20px', 
//         backgroundColor: '#f4f7f6', 
//         minHeight: '100vh', 
//         fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" 
//     },
//     container: { maxWidth: '1100px', margin: '0 auto' },
//     pageTitle: { 
//         textAlign: 'center', 
//         color: '#2d3436', 
//         marginBottom: '40px', 
//         fontSize: '2.2rem',
//         fontWeight: '700'
//     },

//     // Grille de cartes
//     grid: { 
//         display: 'grid', 
//         gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
//         gap: '30px' 
//     },
//     card: { 
//         backgroundColor: '#fff', 
//         borderRadius: '16px', 
//         overflow: 'hidden', 
//         cursor: 'pointer',
//         boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
//         transition: 'transform 0.3s ease',
//         border: '1px solid #eee'
//     },
//     imageWrapper: { width: '100%', height: '180px', overflow: 'hidden' },
//     cardImage: { width: '100%', height: '100%', objectFit: 'cover' },
//     cardInfo: { padding: '20px' },
//     cardTitle: { margin: '10px 0', color: '#2d3436', fontSize: '1.2rem' },
//     badge: { 
//         backgroundColor: '#e3f2fd', 
//         color: '#1976d2', 
//         padding: '5px 12px', 
//         borderRadius: '20px', 
//         fontSize: '0.75rem', 
//         fontWeight: 'bold',
//         textTransform: 'uppercase'
//     },
//     cardFooter: { color: '#b2bec3', fontSize: '0.85rem', marginTop: '10px' },

//     // Vue détaillée
//     detailContainer: { 
//         backgroundColor: '#fff', 
//         padding: '40px', 
//         borderRadius: '24px', 
//         boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
//         animation: 'fadeIn 0.5s ease'
//     },
//     backButton: { 
//         marginBottom: '30px', 
//         border: 'none', 
//         background: 'none', 
//         color: '#0984e3', 
//         cursor: 'pointer', 
//         fontWeight: '600',
//         fontSize: '1rem'
//     },
//     mainTitle: { fontSize: '2.8rem', marginBottom: '25px', color: '#2d3436', lineHeight: '1.2' },
//     detailImage: { 
//         width: '100%', 
//         maxHeight: '450px', 
//         objectFit: 'cover', 
//         borderRadius: '20px', 
//         marginBottom: '35px',
//         boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
//     },
//     contentBox: { lineHeight: '1.8', color: '#444', fontSize: '1.1rem' },
//     introText: { fontStyle: 'italic', color: '#636e72', marginBottom: '30px', fontSize: '1.2rem' },
//     subTitle: { 
//         color: '#2d3436', 
//         marginTop: '40px', 
//         fontSize: '1.6rem',
//         borderLeft: '5px solid #0984e3',
//         paddingLeft: '15px'
//     },
//     sectionText: { marginBottom: '20px' },
//     bottomButton: {
//         marginTop: '40px',
//         padding: '12px 25px',
//         backgroundColor: '#0984e3',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '10px',
//         cursor: 'pointer',
//         fontWeight: 'bold',
//         fontSize: '1rem'
//     }
// };