import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { fetchSortById, deleteSort } from "../services/apiService";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";

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

const SortDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [sort, setSort] = useState<Sort | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const intl = useIntl();

  const [user] = useAuthState(auth); // Vérifier connexion

  useEffect(() => {
    const loadSort = async () => {
      try {
        if (id) {
          const data = await fetchSortById(id);
          setSort(data.sort);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    };
    loadSort();
  }, [id]);

  const handleDelete = async () => {
    if (!user) {
      navigate("/login"); // Redirect page connexion
      return;
    }

    if (!id) return;

    const confirmDelete = window.confirm(
      intl.formatMessage({
        id: "delete.confirmation",
        defaultMessage: "Êtes-vous sûr de vouloir supprimer ce sort ? Cette action est irréversible.",
      })
    );

    if (!confirmDelete) return;

    try {
      await deleteSort(id);
      navigate("/sorts");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  if (error) {
    return (
      <section className="container mx-auto py-20">
        <h1 className="text-4xl font-bold mb-6">
          <FormattedMessage id="sort.details.title" defaultMessage="Détails du Sort" />
        </h1>
        <p className="text-red-500">
          <FormattedMessage id="message.error.generic" defaultMessage="Erreur : {error}" values={{ error }} />
        </p>
        <Link to="/sorts" className="text-blue-500">
          <FormattedMessage id="button.backToList" defaultMessage="Retour à la liste des sorts" />
        </Link>
      </section>
    );
  }

  if (!sort) {
    return (
      <section className="container mx-auto py-20">
        <p>
          <FormattedMessage id="loading.details" defaultMessage="Chargement des détails..." />
        </p>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-10 px-6 sm:px-8 lg:px-12 max-w-4xl bg-gray-800 text-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-8 text-center border-b pb-4">{sort.nom}</h1>
      <div className="space-y-4">
        <p className="text-lg">
          <strong>
            <FormattedMessage id="sort.details.category" defaultMessage="Catégorie : {category}" values={{ category: sort.categorie }} />
          </strong>
        </p>
        <p className="text-lg">
          <FormattedMessage id="sort.details.description" defaultMessage="Description : {description}" values={{ description: sort.description }} />
        </p>
        <p className="text-lg">
          <FormattedMessage
            id="sort.details.difficulty"
            defaultMessage="Niveau de difficulté : {difficulty}"
            values={{ difficulty: sort.niveauDifficulte }}
          />
        </p>
        <p className="text-lg">
          <FormattedMessage id="sort.details.power" defaultMessage="Puissance : {power}" values={{ power: sort.puissance }} />
        </p>
        <p className="text-lg">
          <FormattedMessage
            id="sort.details.tags"
            defaultMessage="Tags : {tags}"
            values={{
              tags:
                sort.tags && Array.isArray(sort.tags) && sort.tags.length > 0
                  ? sort.tags.join(", ")
                  : intl.formatMessage({ id: "sort.details.noTags", defaultMessage: "Aucun tag" }),
            }}
          />
        </p>
        <p className="text-lg">
          <FormattedMessage
            id="sort.details.isForbidden"
            defaultMessage="Est interdit : {isForbidden}"
            values={{
              isForbidden: (
                <FormattedMessage
                  id={sort.estInterdit ? "sort.details.yes" : "sort.details.no"}
                  defaultMessage={sort.estInterdit ? "Oui" : "Non"}
                />
              ),
            }}
          />
        </p>
      </div>
      <div className="flex justify-center space-x-4 mt-8">
        <Link
          to={`/sorts/${sort._id}/edit`}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
        >
          <FormattedMessage id="button.edit" defaultMessage="Modifier" />
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
        >
          <FormattedMessage id="button.delete" defaultMessage="Supprimer" />
        </button>
      </div>
      <div className="mt-6 text-center">
        <Link to="/sorts" className="text-blue-400 hover:underline">
          <FormattedMessage id="button.backToList" defaultMessage="Retour à la liste des sorts" />
        </Link>
      </div>
    </section>
  );
};

export default SortDetails;
