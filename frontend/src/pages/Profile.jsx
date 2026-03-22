export default function Profile({user, setUser}){

    return (
        <div>
            <img src="https://i.etsystatic.com/50406753/r/il/314979/5977768751/il_fullxfull.5977768751_l6ya.jpg" alt="profile-img" />
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.progress.courseUnlocked}</span>
            <span>{user.progress.quizLevel}</span>
        </div>
    )
} 