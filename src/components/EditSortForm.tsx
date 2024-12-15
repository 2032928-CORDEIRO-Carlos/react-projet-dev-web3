import { useState } from "react";
import { updateSort } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

interface EditSortFormProps {
  sort: {
    _id: string;
    nom: string;
    categorie: string;
    description: string;
    niveauDifficulte: number;
    puissance: number;
    tags: string[];
    estInterdit: boolean;
    dateCreation: string;
  };
  navigate: ReturnType<typeof useNavigate>;
}

const EditSortForm: React.FC<EditSortFormProps> = ({ sort, navigate }) => {
  const [formData, setFormData] = useState({
    nom: sort.nom,
    categorie: sort.categorie,
    description: sort.description,
    niveauDifficulte: sort.niveauDifficulte,
    puissance: sort.puissance,
    tags: sort.tags.join(", "),
    estInterdit: sort.estInterdit,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nom || formData.nom.length < 3) {
      newErrors.nom = "form.errors.name";
    }
    if (!formData.categorie) {
      newErrors.categorie = "form.errors.category";
    }
    if (!["Curatif", "Offensif", "Défensif", "Utilitaire"].includes(formData.categorie)) {
      newErrors.categorie = "form.errors.invalidCategory";
    }
    if (!formData.description || formData.description.length < 3) {
      newErrors.description = "form.errors.description";
    }
    if (formData.niveauDifficulte < 1 || formData.niveauDifficulte > 10) {
      newErrors.niveauDifficulte = "form.errors.difficulty";
    }
    if (formData.puissance < 1 || formData.puissance > 10) {
      newErrors.puissance = "form.errors.power";
    }
    if (!formData.tags.split(",").every((tag) => tag.trim().length > 0)) {
      newErrors.tags = "form.errors.tags";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const tagsArray = formData.tags.split(",").map((tag) => tag.trim());
      const payload = {
        sort: {
          nom: formData.nom,
          categorie: formData.categorie,
          niveauDifficulte: formData.niveauDifficulte,
          description: formData.description,
          dateCreation: sort.dateCreation,
          estInterdit: formData.estInterdit,
          tags: tagsArray,
          puissance: formData.puissance,
        },
      };

      await updateSort(sort._id, payload);
      navigate("/sorts");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label htmlFor="nom" className="block font-bold">
          <FormattedMessage id="form.name" defaultMessage="Nom" /> :
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          className={`border p-2 w-full ${errors.nom ? "border-red-500" : ""}`}
        />
        {errors.nom && (
          <p className="text-red-500">
            <FormattedMessage id={errors.nom} defaultMessage="Vous devez saisir un nom valide." />
          </p>
        )}
      </div>

      <div>
        <label htmlFor="categorie" className="block font-bold">
          <FormattedMessage id="form.category" defaultMessage="Catégorie" /> :
        </label>
        <select
          id="categorie"
          name="categorie"
          value={formData.categorie}
          onChange={handleChange}
          className={`border p-2 w-full ${errors.categorie ? "border-red-500" : ""}`}
        >
          <option value="">
            <FormattedMessage id="form.selectCategory" defaultMessage="-- Sélectionnez une catégorie --" />
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
        {errors.categorie && (
          <p className="text-red-500">
            <FormattedMessage id={errors.categorie} defaultMessage="Veuillez sélectionner une catégorie." />
          </p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block font-bold">
          <FormattedMessage id="form.description" defaultMessage="Description" /> :
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`border p-2 w-full ${errors.description ? "border-red-500" : ""}`}
        />
        {errors.description && (
          <p className="text-red-500">
            <FormattedMessage id={errors.description} defaultMessage="Veuillez fournir une description valide." />
          </p>
        )}
      </div>

      <div>
        <label htmlFor="niveauDifficulte" className="block font-bold">
          <FormattedMessage id="form.difficulty" defaultMessage="Niveau de difficulté" /> :
        </label>
        <input
          type="number"
          id="niveauDifficulte"
          name="niveauDifficulte"
          value={formData.niveauDifficulte}
          onChange={handleChange}
          className={`border p-2 w-full ${errors.niveauDifficulte ? "border-red-500" : ""}`}
        />
        {errors.niveauDifficulte && (
          <p className="text-red-500">
            <FormattedMessage id={errors.niveauDifficulte} defaultMessage="Le niveau de difficulté doit être valide." />
          </p>
        )}
      </div>

      <div>
        <label htmlFor="puissance" className="block font-bold">
          <FormattedMessage id="form.power" defaultMessage="Puissance" /> :
        </label>
        <input
          type="number"
          id="puissance"
          name="puissance"
          value={formData.puissance}
          onChange={handleChange}
          className={`border p-2 w-full ${errors.puissance ? "border-red-500" : ""}`}
        />
        {errors.puissance && (
          <p className="text-red-500">
            <FormattedMessage id={errors.puissance} defaultMessage="La puissance doit être comprise entre 1 et 10." />
          </p>
        )}
      </div>

      <div>
        <label htmlFor="tags" className="block font-bold">
          <FormattedMessage id="form.tags" defaultMessage="Tags (séparés par des virgules)" /> :
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className={`border p-2 w-full ${errors.tags ? "border-red-500" : ""}`}
        />
        {errors.tags && (
          <p className="text-red-500">
            <FormattedMessage id={errors.tags} defaultMessage="Chaque tag doit contenir au moins un caractère." />
          </p>
        )}
      </div>

      <div>
        <label htmlFor="estInterdit" className="block font-bold">
          <FormattedMessage id="form.isForbidden" defaultMessage="Est interdit" /> :
        </label>
        <input
          type="checkbox"
          id="estInterdit"
          name="estInterdit"
          checked={formData.estInterdit}
          onChange={handleChange}
          className="mr-2"
        />
        <span>
          {formData.estInterdit ? (
            <FormattedMessage id="form.yes" defaultMessage="Oui" />
          ) : (
            <FormattedMessage id="form.no" defaultMessage="Non" />
          )}
        </span>
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        <FormattedMessage id="form.submit" defaultMessage="Soumettre" />
      </button>
    </form>
  );
};

export default EditSortForm;
