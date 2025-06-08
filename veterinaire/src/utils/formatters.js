export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatAnimalType = (type) => {
  const types = {
    DOG: 'Chien',
    CAT: 'Chat',
    RABBIT: 'Lapin'
  };
  return types[type] || type;
};