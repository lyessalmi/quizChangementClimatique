import { BrowserRouter, Route, Routes} from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider } from "./ThemeChange";
import Navbar from "./components.jsx";
import Quiz from "./pages/Quiz";
import Signup from "./pages/Signup";
import Courses from "./pages/Courses";
import BlocNotes from "./pages/BlocNotes";
import Login from "./pages/Login";
import Profile from "./pages/Profile";


export default function App(){
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if(savedUser) setUser(savedUser);
    }, []);
    
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Navbar user={user} />
                <Routes>
                    <Route path="/" element={user ? <Profile user={user} setUser={setUser} /> : <Login user={user} setUser={setUser} />} />
                    <Route path="/quiz" element={<Quiz user={user} setUser={setUser}/>} />
                    <Route path="/courses" element={<Courses user={user}/>} />
                {/* <Route path="/blocnotes" element={<BlocNotes />} /> */}
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}