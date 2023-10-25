const categoriesSlice = (set, get) => ({
  session: {},
  setSession: (session) => {
    set({ session: session });
  },
  categories: [],
  setCategories: (categories) => {
    set({ categories: categories });
  },
});

export default categoriesSlice;
