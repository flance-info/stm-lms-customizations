import { Category } from '~/models';

export const getCategoriesGroupedByParents = (categories: Category[]) => {
  const categoriesGroupedByParents: Category[] = [];
  const rearrangeArray = (categoryId: number) => {
    const children = categories.filter(category => category.parent === categoryId);
    children.forEach(child => {
      categoriesGroupedByParents.push(child);
      rearrangeArray(child.id);
    });
  };

  categories.filter(category => category.parent === 0).forEach(category => {
    categoriesGroupedByParents.push(category);
    rearrangeArray(category.id);
  });

  return categoriesGroupedByParents;
};
