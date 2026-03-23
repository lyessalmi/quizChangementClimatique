import { useNavigate } from "react-router-dom"
import IMGNCOURSES from "../images/imgNcourses"
import {Fragment, useState } from "react";


function CourseDisplay({activeCourse}){
    return (
        <div>
            <h2>{activeCourse.title}</h2>
            <img src={activeCourse.image} alt="img" />
            <p>{activeCourse.content.intro}</p>

            {
                activeCourse.content.sections.map((s, index) => (
                    <Fragment key={index}>
                        <h3>{s.subTitle}</h3>
                        <p>{s.text}</p>
                    </Fragment>
                ))
            }
        </div>
    )
}



export default function Courses({user}){
    const [activeCourse, setActiveCourse] = useState(null);
    const navigate = useNavigate()
    
    function onClick(courseId){
        fetch(`http://localhost:3000/courses/${courseId}`, {method : 'GET'})
        .then((response) => response.json())
        .then((data) => {
            if(data.success){
                setActiveCourse(data.course);
            }
            else{
                alert(data.message);
                navigate('/');
                localStorage.removeItem("user");
            }
        }) 
        .catch(err => console.error("Erreur fetch :", err));
    }

    return (
        <div>
            {
                user && (activeCourse ? <CourseDisplay activeCourse={activeCourse} /> : IMGNCOURSES.slice(0, user.progress.courseUnlocked).map((img) => (
                    <img key={img.id} src={img.linkImage} alt="course" width={200} height={200} onClick={() => onClick(img.id)}/> 
                )))
            }
        </div>
    )
} 