const categoriesSlice = (set, get) => ({
  categories: [],
  setCategories: (categories) => {
    set({ categories: categories });
  },
});

export default categoriesSlice;
