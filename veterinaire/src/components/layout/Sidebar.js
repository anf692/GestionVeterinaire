import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/owners">📋 Propriétaires</Link></li>
        <li><Link to="/patients">🐶 Patients</Link></li>
      </ul>

      {user && (
        <div className="sidebar-user">
          <p>Connecté en tant que :</p>
          <strong>{user.username}</strong>
          <br />
          <small>{user.role}</small>
        </div>
      )}
    </aside>
  );
}
