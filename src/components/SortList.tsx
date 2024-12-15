import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

interface Sort {
  _id: string;
  nom: string;
  categorie: string;
}

interface SortListProps {
  sorts: Sort[];
  noFiltersApplied: boolean; 
}

const SortList = ({ sorts, noFiltersApplied }: SortListProps) => {
  if (sorts.length === 0) {
    return (
      <p className="text-gray-500">
        {noFiltersApplied ? (
          <FormattedMessage
            id="sorts.list.empty"
            defaultMessage="Aucun sort n'existe dans la base de données."
          />
        ) : (
          <FormattedMessage
            id="sorts.list.noFilters"
            defaultMessage="Aucun sort ne correspond aux filtres sélectionnés."
          />
        )}
      </p>
    );
  }

  return (
    <section className="space-y-4">
      {sorts.map((sort) => (
        <Link
          key={sort._id}
          to={`/sorts/${sort._id}`}
          className="text-blue-500 block border p-4 rounded"
        >
          <h2 className="font-bold">{sort.nom}</h2>
          <p>
            <FormattedMessage
              id="sortList.category"
              defaultMessage="Catégorie : {category}"
              values={{ category: sort.categorie }}
            />
          </p>
        </Link>
      ))}
    </section>
  );
};

export default SortList;
