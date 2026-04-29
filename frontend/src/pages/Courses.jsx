import { useNavigate } from "react-router-dom"
import {Fragment, useEffect, useState } from "react";


function CourseDisplay({activeCourse, setActiveCourse}){
    return (
        <section className="course-card">
            <div className="course-card-header">
                <span className="course-badge">Module {activeCourse.id}</span>
                <h2 className="course-heading">{activeCourse.title}</h2>
            </div>

            {activeCourse.image && (
                <img src={activeCourse.image} alt={activeCourse.title} className="course-image" />
            )}

            <div className="course-content">
                <p className="course-intro">{activeCourse.content.intro}</p>
                
                {activeCourse.content.sections.map((s, index) => (
                    <Fragment key={index}>
                        <h3 className="course-subtitle">{s.subTitle}</h3>
                        <p className="course-text">{s.text}</p>
                    </Fragment>
                ))}
            </div>

            <button className="quiz-action-button secondary" onClick={() => setActiveCourse(null)}>Retour aux cours</button>
        </section>
    )
}


export default function Courses({user}){
    const [courses, setCourses] = useState([]);
    const [activeCourse, setActiveCourse] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        if(user){
            fetch(`https://quizchangementclimatique.onrender.com/courses`, {method : 'GET'})
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
    }, [user, navigate]);


    return (
        user && <main className="courses-page">
            {activeCourse ? (
                <CourseDisplay activeCourse={activeCourse} setActiveCourse={setActiveCourse} />
            ) : (
                <section className="courses-list">
                    <h1 className="courses-title">Les cours</h1>
                    <div className="courses-grid">
                        {courses.slice(0, user.progress.courseUnlocked).map((c) => (
                            <button key={c.id} className="course-item" onClick={() => setActiveCourse(c)}>
                                <div className="course-item-image">
                                    <img src={c.image} alt={c.title} />
                                </div>
                                <div className="course-item-info">
                                    <span className="course-badge">Module {c.id}</span>
                                    <h3 className="course-item-title">{c.title}</h3>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            )}
        </main>
    )
}