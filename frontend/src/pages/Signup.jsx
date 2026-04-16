import { useNavigate } from "react-router-dom";


export default function Signup(){
    const navigate = useNavigate();

    
    function onSubmit(event){
        event.preventDefault();

        fetch('http://localhost:3000/signup', {
            method : "POST",
            headers : {"Content-Type" : "application/json"}, 
            body : JSON.stringify({name : event.target.name.value, firstname : event.target.firstname.value, username : event.target.username.value, email : event.target.email.value, password : event.target.password.value, progress: { courseUnlocked: 1, quizUnlocked : 1}}),
        })
        .then(response => response.json())
        .then((data) => {
            alert(data.message);
            navigate("/");
        })
        .catch(err => console.error(err));
    }


    return (
        <div>
            <h2>Signup</h2>
            
            <form id="form-signup" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">Name : </label>
                        <input name="name" type="text" id="name" placeholder="Enter your last name" required/>
                </div>

                <div>
                    <label htmlFor="firstname">Firstname : </label>
                        <input name="firstname" type="text" id="firstname" placeholder="Enter your first name" required/>
                </div>

                <div>
                    <label htmlFor="username">Username : </label>
                        <input name="username" type="text" id="username" placeholder="Choose a username" required/>
                </div>

                <div>
                    <label htmlFor="email">Email : </label>
                        <input name="email" type="email" id="email" placeholder="Enter your email" required/>
                </div>

                <div>
                    <label htmlFor="password">Password : </label>
                        <input name="password" type="password" id="password" placeholder="Enter your password" required/>
                </div>

                <button type="submit"> Signup</button>
            </form>
        </div>
    )
}