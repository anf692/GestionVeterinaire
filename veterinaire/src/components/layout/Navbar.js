import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="header">
      <h1>Sunu Vétérinaire</h1>
      <nav className="nav-links" aria-label="Navigation principale">
        <Link to="/">Accueil</Link>
        <Link to="/login">Déconnexion</Link>
      </nav>
    </header>
  );
}

export default Navbar;
