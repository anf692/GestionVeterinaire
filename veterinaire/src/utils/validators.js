// validators.js

// Vérifie si un email est valide
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Vérifie si un champ est vide
export const isEmpty = (value) => {
  return !value || value.trim() === '';
};

// Vérifie si un poids est un nombre positif
export const isValidWeight = (weight) => {
  return !isNaN(weight) && Number(weight) > 0;
};
