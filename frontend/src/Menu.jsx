import { Link } from "react-router-dom";

export default function Menu({user}){
    return (
        <nav>
            <ul>
                <li><Link to="/">{user ? "Profile" : "Login" }</Link></li>
                {/* <li><Link to="/blocnotes">BlocNotes</Link></li> */}
                <li><Link to="/quiz">Quiz</Link></li>
                <li><Link to="/courses">Cours</Link></li>
            </ul>
        </nav>
    )
}

