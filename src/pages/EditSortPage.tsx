import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import EditSortForm from "../components/EditSortForm";
import { fetchSortById } from "../services/apiService";

interface Sort {
  _id: string;
  nom: string;
  categorie: string;
  description: string;
  niveauDifficulte: number;
  puissance: number;
  tags: string[];
  estInterdit: boolean;
  dateCreation: string;
}

const EditSortPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID depuis l'URL
  const navigate = useNavigate();
  const [sortData, setSortData] = useState<Sort | null>(null);
  const [error, setError] = useState<React.ReactNode | null>(null); // JSX ou null

  useEffect(() => {
    const fetchSort = async () => {
      try {
        if (id) {
          const data = await fetchSortById(id);
          setSortData(data.sort);
        }
      } catch {
        setError(
          <FormattedMessage
            id="message.error.generic"
            defaultMessage="Erreur lors de la récupération des détails du sort."
          />
        );
      }
    };

    fetchSort();
  }, [id]);

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate("/sorts")}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          <FormattedMessage id="button.backToList" defaultMessage="Retour à la liste des sorts" />
        </button>
      </div>
    );
  }

  if (!sortData) {
    return (
      <div className="container mx-auto p-4">
        <p>
          <FormattedMessage id="loading.details" defaultMessage="Chargement des données..." />
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        <FormattedMessage id="page.editSort.title" defaultMessage="Modifier le sort" />
      </h1>
      <EditSortForm sort={sortData} navigate={navigate} />

      {/* Bouton Annuler */}
      <div className="mt-4">
        <button
          onClick={() => navigate(-1)} // Aller à la page d'avant
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        >
          <FormattedMessage id="button.cancel" defaultMessage="Annuler" />
        </button>
      </div>
    </div>
  );
};

export default EditSortPage;
