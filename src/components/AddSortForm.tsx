import { useState } from "react";
import { addSort } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const AddSortForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    categorie: "",
    description: "",
    niveauDifficulte: 1,
    puissance: 1,
    tags: "",
    estInterdit: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
          dateCreation: new Date().toISOString(),
          estInterdit: formData.estInterdit,
          tags: tagsArray,
          puissance: formData.puissance,
        },
      };

      await addSort(payload);
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
          <FormattedMessage id="form.name" defaultMessage="Name" /> :
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
            <FormattedMessage id={errors.nom} defaultMessage="You must provide a valid name." />
          </p>
        )}
      </div>

      <div>
        <label htmlFor="categorie" className="block font-bold">
          <FormattedMessage id="form.category" defaultMessage="Category" /> :
        </label>
        <select
          id="categorie"
          name="categorie"
          value={formData.categorie}
          onChange={handleChange}
          className={`border p-2 w-full ${errors.categorie ? "border-red-500" : ""}`}
        >
          <FormattedMessage id="form.selectCategory">
            {(placeholder) => (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
          </FormattedMessage>
          <option value="Curatif">
            <FormattedMessage id="category.curatif" defaultMessage="Curative" />
          </option>
          <option value="Offensif">
            <FormattedMessage id="category.offensif" defaultMessage="Offensive" />
          </option>
          <option value="Défensif">
            <FormattedMessage id="category.defensif" defaultMessage="Defensive" />
          </option>
          <option value="Utilitaire">
            <FormattedMessage id="category.utilitaire" defaultMessage="Utility" />
          </option>
        </select>
        {errors.categorie && (
          <p className="text-red-500">
            <FormattedMessage id={errors.categorie} defaultMessage="Please select a category." />
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
            <FormattedMessage id={errors.description} defaultMessage="Please provide a valid description." />
          </p>
        )}
      </div>

      <div>
        <label htmlFor="niveauDifficulte" className="block font-bold">
          <FormattedMessage id="form.difficulty" defaultMessage="Difficulty Level" /> :
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
            <FormattedMessage id={errors.niveauDifficulte} defaultMessage="Difficulty level must be between 1 and 10." />
          </p>
        )}
      </div>

      <div>
        <label htmlFor="puissance" className="block font-bold">
          <FormattedMessage id="form.power" defaultMessage="Power" /> :
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
            <FormattedMessage id={errors.puissance} defaultMessage="Power must be between 1 and 10." />
          </p>
        )}
      </div>

      <div>
        <label htmlFor="tags" className="block font-bold">
          <FormattedMessage id="form.tags" defaultMessage="Tags (comma-separated)" /> :
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
            <FormattedMessage id={errors.tags} defaultMessage="Each tag must contain at least one character." />
          </p>
        )}
      </div>

      <div>
        <label htmlFor="estInterdit" className="block font-bold">
          <FormattedMessage id="form.isForbidden" defaultMessage="Is Forbidden" /> :
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
            <FormattedMessage id="form.yes" defaultMessage="Yes" />
          ) : (
            <FormattedMessage id="form.no" defaultMessage="No" />
          )}
        </span>
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        <FormattedMessage id="form.submit" defaultMessage="Submit" />
      </button>
    </form>
  );
};

export default AddSortForm;
