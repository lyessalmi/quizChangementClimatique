import { useNavigate } from "react-router-dom"
import {Fragment, useEffect, useState } from "react";


export default function Courses({user}){
    const [courses, setCourses] = useState([]);
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
        user && courses && <div>
            {
                courses.slice(0, user.progress.courseUnlocked).map((c) => {
                    return (
                        <Fragment key={c.id}>
                            <img src={c.image} alt={"Image sur le " + c.title} />
                            <br />
                        </Fragment>
                    )
                })
            }
        </div>
    )
} 







// import { useNavigate } from "react-router-dom";
// import IMGNCOURSES from "../images/imgNcourses";
// import { Fragment, useState } from "react";

// // --- COMPOSANT DE DÉTAIL DU COURS ---
// function CourseDisplay({ activeCourse, onBack }) {
//     return (
//         <div style={styles.detailContainer}>
//             <button onClick={onBack} style={styles.backButton}>← Retour aux cours</button>
//             <h2 style={styles.mainTitle}>{activeCourse.title}</h2>
//             <img src={activeCourse.image} alt="course" style={styles.detailImage} />
//             <div style={styles.contentBox}>
//                 <p style={styles.introText}>{activeCourse.content.intro}</p>
//                 {activeCourse.content.sections.map((s, index) => (
//                     <Fragment key={index}>
//                         <h3 style={styles.subTitle}>{s.subTitle}</h3>
//                         <p style={styles.sectionText}>{s.text}</p>
//                     </Fragment>
//                 ))}
//             </div>
//         </div>
//     );
// }

// // --- COMPOSANT PRINCIPAL ---
// export default function Courses({ user }) {
//     const [activeCourse, setActiveCourse] = useState(null);
//     const navigate = useNavigate();

//     const fetchCourse = (courseId) => {
//         fetch(`http://localhost:3000/courses/${courseId}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.success) {
//                     setActiveCourse(data.course);
//                 } else {
//                     alert(data.message);
//                     navigate('/');
//                     localStorage.removeItem("user");
//                 }
//             })
//             .catch(err => console.error("Erreur :", err));
//     };

//     return (
//         <div style={styles.wrapper}>
//             <h1 style={styles.pageTitle}>Mes Formations</h1>
//             <div style={styles.container}>
//                 {user && (
//                     activeCourse ? (
//                         <CourseDisplay activeCourse={activeCourse} onBack={() => setActiveCourse(null)} />
//                     ) : (
//                         <div style={styles.grid}>
//                             {IMGNCOURSES.slice(0, user.progress.courseUnlocked).map((img) => (
//                                 <div key={img.id} style={styles.card} onClick={() => fetchCourse(img.id)}>
//                                     <div style={styles.imageWrapper}>
//                                         <img src={img.linkImage} alt="course" style={styles.cardImage} />
//                                     </div>
//                                     <div style={styles.cardInfo}>
//                                         <span style={styles.badge}>Disponible</span>
//                                         <h4 style={styles.cardTitle}>Module {img.id}</h4>
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

// // --- STYLES (Design moderne & épuré) ---
// const styles = {
//     wrapper: { padding: '40px 20px', backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Arial, sans-serif' },
//     pageTitle: { textAlign: 'center', color: '#2d3436', marginBottom: '30px', fontSize: '2rem' },
//     container: { maxWidth: '1000px', margin: '0 auto' },
    
//     // Grid & Cards
//     grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px' },
//     card: { 
//         backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', cursor: 'pointer',
//         boxShadow: '0 4px 15px rgba(0,0,0,0.1)', transition: 'transform 0.2s, boxShadow 0.2s'
//     },
//     imageWrapper: { width: '100%', height: '160px', overflow: 'hidden' },
//     cardImage: { width: '100%', height: '100%', objectFit: 'cover' },
//     cardInfo: { padding: '15px' },
//     cardTitle: { margin: '10px 0 0', color: '#2d3436' },
//     badge: { backgroundColor: '#e1f5fe', color: '#03a9f4', padding: '4px 8px', borderRadius: '5px', fontSize: '0.8rem', fontWeight: 'bold' },

//     // Detail View
//     detailContainer: { backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' },
//     backButton: { marginBottom: '20px', border: 'none', background: 'none', color: '#0984e3', cursor: 'pointer', fontWeight: 'bold' },
//     mainTitle: { fontSize: '2.5rem', marginBottom: '20px', color: '#2d3436' },
//     detailImage: { width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '15px', marginBottom: '30px' },
//     contentBox: { lineHeight: '1.6', color: '#636e72' },
//     subTitle: { color: '#2d3436', marginTop: '30px', borderBottom: '2px solid #f1f2f6', paddingBottom: '10px' },
// };