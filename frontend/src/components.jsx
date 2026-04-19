import { Link, useLocation } from "react-router-dom";
import logo from "./ressource/logo.png";

export default function Navbar({ user }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/" && !user;
  const isSignupPage = location.pathname === "/signup" && !user;



  return (
    <nav className="navbar">
      <div className="nav-side nav-left">
        {!isLoginPage && !isSignupPage && (
          <div className="nav-group">
            <Link className="nav-button" to="/quiz">Quiz</Link>
            <Link className="nav-button" to="/courses">Cours</Link>
          </div>
        )}
      </div>

      <div className="nav-logo">
        <Link to="/" className="logo-link">
          <img className="logo" src={logo} alt="Logo" />
          <p className="lyfo">Lyfo</p>
        </Link>
      </div>

      <div className="nav-side nav-right">
        {user ? (
          <Link className="nav-button" to="/">Profil</Link>
        ) : isLoginPage ? (
          <Link className="nav-button" to="/signup">Inscription</Link>
        ) : (
          <>
            <Link className="nav-button" to="/">Connexion</Link>
            <Link className="nav-button" to="/signup">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
}
