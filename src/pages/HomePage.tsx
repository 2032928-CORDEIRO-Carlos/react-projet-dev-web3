import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import responsiveConfig from "../context/responsive";

const HomePage = () => {
  return (
    <div className={`${responsiveConfig.section} ${responsiveConfig.flexCenter}`}>
      <div
        className={`text-center ${responsiveConfig.maxWidth} ${responsiveConfig.container}`}
      >
        <h1 className={`${responsiveConfig.text.title} mb-6`}>
          <FormattedMessage id="homepage.welcome" defaultMessage="Bienvenue dans le gestionnaire de sortilèges !" />
        </h1>
        <p className={`${responsiveConfig.text.subtitle} mb-8`}>
          <FormattedMessage id="homepage.subtitle" defaultMessage="Projet réalisé dans le cadre du cours de Développement Web 3 | Hiver 2024" />
        </p>
        <Link
          to="/sorts"
          className={`${responsiveConfig.button} w-3/4 sm:w-1/2 lg:w-auto`}
        >
          <FormattedMessage id="homepage.viewSorts" defaultMessage="Voir la liste des sorts" />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
