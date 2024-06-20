export const generateMonths = () => {
  return Array.from({ length: 12 }, (_, i) => {
    const year = new Date().getFullYear();
    const month = String(i + 1).padStart(2, '0');
    return `${year}-${month}`;
  });
};
