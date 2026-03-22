import { useNavigate } from "react-router-dom";

export default function Signup(){
    const navigate = useNavigate();

    function onSubmit(event){
        event.preventDefault();

        fetch('http://localhost:3000/signup', {
            method : "POST",
            headers : {"Content-Type" : "application/json"}, 
            body : JSON.stringify({name : event.target.name.value, firstname : event.target.firstname.value, username : event.target.username.value, email : event.target.email.value, password : event.target.password.value, progress: { courseUnlocked: 1, quizLevel : 1 }}),
        })
        .then(response => response.json())
        .then((data) => {
            alert(data.message);
            navigate("/");
        })
        .catch(err => console.error(err));
    }


    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Signup</h2>
            
            <form id="form-signup" onSubmit={onSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="name">Name : </label>
                        <input name="name" type="text" id="name" placeholder="Enter your last name" required style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}  />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="firstname">Firstname : </label>
                        <input name="firstname" type="text" id="firstname" placeholder="Enter your first name" required style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}  />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="username">Username : </label>
                        <input name="username" type="text" id="username" placeholder="Choose a username" required style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="email">Email : </label>
                        <input name="email" type="email" id="email" placeholder="Enter your email" required style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="password">Password : </label>
                        <input name="password" type="password" id="password" placeholder="Enter your password" required style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}  />
                </div>

                <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "5px", backgroundColor: "#007bff", color: "white", border: "none" }}> Signup</button>
            </form>
        </div>
    )
}