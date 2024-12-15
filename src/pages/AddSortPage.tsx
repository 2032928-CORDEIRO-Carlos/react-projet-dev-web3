import AddSortForm from "../components/AddSortForm";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const AddSortPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        <FormattedMessage id="page.addSort.title" defaultMessage="Ajouter un nouveau sort" />
      </h1>
      <AddSortForm />
      
      {/* Bouton Annuler */}
      <div className="mt-4">
        <Link
          to="/sorts"
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        >
          <FormattedMessage id="button.cancel" defaultMessage="Annuler" />
        </Link>
      </div>
    </div>
  );
};

export default AddSortPage;
