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