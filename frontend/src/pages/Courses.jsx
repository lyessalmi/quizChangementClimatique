import { useNavigate } from "react-router-dom"
import IMGNCOURSES from "../images/imgNcourses"
import { useState } from "react";


function CourseDisplay({activeCourse}){
    return <p>{activeCourse.title}</p>
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
                activeCourse ? <CourseDisplay activeCourse={activeCourse} /> : IMGNCOURSES.slice(0, user.progress.courseUnlocked).map((img) => (
                    <img key={img.id} src={img.linkImage} alt="course" width={200} height={200} onClick={() => onClick(img.id)}/> 
                ))
            }
        </div>
    )
} 