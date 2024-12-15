import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { FormattedMessage } from "react-intl";
import { auth, logOut } from "../services/firebase";

interface NavbarProps {
  toggleLanguage: () => void;
  locale: string;
}

const Navbar: React.FC<NavbarProps> = ({ toggleLanguage, locale }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthAction = () => {
    if (user) {
      logOut();
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {/* Titre de la page */}
        <h1 className="text-xl font-bold">
          <FormattedMessage id="app.title" defaultMessage="Gestion des sorts" />
        </h1>

        {/* Bouton Accueil */}
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          <FormattedMessage id="button.home" defaultMessage="Accueil" />
        </button>
      </div>
      <div className="flex space-x-4 items-center">
        {/* Bouton changement de langue */}
        <button
          onClick={toggleLanguage}
          className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          {locale === "fr" ? "English" : "Français"}
        </button>

        {/* Bouton Connexion / Déconnexion */}
        <button
          onClick={handleAuthAction}
          className={`py-2 px-4 rounded ${
            user
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } transition`}
        >
          {user ? (
            <FormattedMessage id="button.logout" defaultMessage="Déconnexion" />
          ) : (
            <FormattedMessage id="button.login" defaultMessage="Connexion" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
