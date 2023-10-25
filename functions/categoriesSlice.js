const categoriesSlice = (set, get) => ({
  categories: [],
  setCategories: (categories) => {
    set({ categories: categories });
  },
  session: {},
  setSession: (sessionData) => {
    set({ session: sessionData });
  },
});

export default categoriesSlice;
