const API_BASE_URL = "http://localhost:5000/api";

// Fonction pour récupérer tous les sorts avec des filtres optionnels
export const fetchSorts = async (filters: { categorie?: string; estInterdit?: boolean } = {}) => {
  const queryParams = new URLSearchParams();

  if (filters.categorie) {
    queryParams.append("categorie", filters.categorie);
  }
  if (filters.estInterdit !== undefined) {
    queryParams.append("estInterdit", filters.estInterdit.toString());
  }

  const response = await fetch(`${API_BASE_URL}/sorts?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des sorts.");
  }
  return response.json();
};


// Fonction pour récupérer les détails d'un sort par ID
export const fetchSortById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/sorts/${id}`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des détails du sort.");
  }
  return response.json();
};

// Fonction pour ajouter un sort
export const addSort = async (payload: {
  sort: {
    nom: string;
    categorie: string;
    description: string;
    niveauDifficulte: number;
    puissance: number;
    tags: string[];
    dateCreation: string;
    estInterdit: boolean;
  };
}) => {
  const response = await fetch(`${API_BASE_URL}/sorts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de l'ajout du sort.");
  }

  return response.json();
};

// Fonction pour mettre à jour un sort existant
export const updateSort = async (
  id: string,
  updatedSort: {
    sort: {
      nom: string;
      categorie: string;
      description: string;
      niveauDifficulte: number;
      puissance: number;
      tags: string[];
      dateCreation: string;
      estInterdit: boolean;
    };
  }
) => {
  const response = await fetch(`${API_BASE_URL}/sorts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedSort),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la mise à jour du sort.");
  }

  return response.json();
};

// Fonction pour supprimer un sort
export const deleteSort = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/sorts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la suppression du sort.");
  }

  return response.json();
};
