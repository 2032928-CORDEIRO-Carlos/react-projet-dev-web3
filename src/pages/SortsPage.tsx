import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import SortList from "../components/SortList";
import { fetchSorts } from "../services/apiService";

interface Sort {
  _id: string;
  nom: string;
  categorie: string;
  estInterdit: boolean;
}

const SortsPage = () => {
  const [sorts, setSorts] = useState<Sort[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Filtres
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showInterdits, setShowInterdits] = useState<boolean | null>(null);

  // Fonction pour récupérer les sorts avec filtres
  const fetchFilteredSorts = useCallback(async () => {
    try {
      // On laisse undefined si null ou vide
      const filters = {
        categorie: selectedCategory || undefined,
        estInterdit: showInterdits !== null ? showInterdits : undefined,
      };

      const { sorts: fetchedSorts } = await fetchSorts(filters);
      setSorts(fetchedSorts);
      setError(null);
    } catch {
      setError("Erreur lors de la récupération des sorts.");
    }
  }, [selectedCategory, showInterdits]);

  // Pour load les sorts initialement et à chaque modification d'un des 2 filtres
  useEffect(() => {
    fetchFilteredSorts();
  }, [fetchFilteredSorts]);

  return (
    <section className="container mx-auto py-20">
      <h1 className="text-4xl font-bold mb-6">
        <FormattedMessage id="sorts.list.title" defaultMessage="Liste des Sorts" />
      </h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Bouton ajout sort */}
      <div className="mb-4 flex justify-end">
        <Link
          to="/add-sort"
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          <FormattedMessage id="button.addSort" defaultMessage="Ajouter un nouveau sort" />
        </Link>
      </div>

      {/* Filtres */}
      <div className="mb-6 flex items-center space-x-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">
            <FormattedMessage id="filter.allCategories" defaultMessage="Toutes les catégories" />
          </option>
          <option value="Curatif">
            <FormattedMessage id="category.curatif" defaultMessage="Curatif" />
          </option>
          <option value="Offensif">
            <FormattedMessage id="category.offensif" defaultMessage="Offensif" />
          </option>
          <option value="Défensif">
            <FormattedMessage id="category.defensif" defaultMessage="Défensif" />
          </option>
          <option value="Utilitaire">
            <FormattedMessage id="category.utilitaire" defaultMessage="Utilitaire" />
          </option>
        </select>

        <div className="flex items-center space-x-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showInterdits === true}
              onChange={() => setShowInterdits(showInterdits === true ? null : true)}
              className="mr-2"
            />
            <span>
              <FormattedMessage id="filter.showInterdits" defaultMessage="Interdits" />
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showInterdits === false}
              onChange={() => setShowInterdits(showInterdits === false ? null : false)}
              className="mr-2"
            />
            <span>
              <FormattedMessage id="filter.showNonInterdits" defaultMessage="Non Interdits" />
            </span>
          </label>
        </div>
      </div>

      {/* Affiche liste des sorts ou message si aucn resultat */}
      {sorts.length > 0 ? (
        <SortList sorts={sorts} noFiltersApplied={false} />
      ) : (
        <p className="text-gray-500 text-center">
          <FormattedMessage id="sorts.noResults" defaultMessage="Aucun sort ne correspond aux filtres." />
        </p>
      )}
    </section>
  );
};

export default SortsPage;
