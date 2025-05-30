// formatters.js

// Formate une date au format français : JJ/MM/AAAA
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
};

// Formate le poids avec unité en kg
export const formatWeight = (weight) => {
  return `${weight} kg`;
};

// Met la première lettre d'une chaîne en majuscule
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
