// fonction utilitaire pour générer les classes CSS conditionnelles pour les colonnes

export const getNumberColumns = (index: number) => {
  if (index > 2) return 'hidden lg:table-cell';
  if (index > 1) return 'hidden md:table-cell';
  if (index > 0) return 'hidden sm:table-cell';
  return '';
};


