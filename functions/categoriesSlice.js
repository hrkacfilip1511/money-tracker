const categoriesSlice = (set, get) => ({
  budget: null,
  setBudget: (budget) => {
    set({ budget: budget });
  },
  session: null,
  setSession: (session) => {
    set({ session: session });
  },
  categories: [],
  setCategories: (categories) => {
    set({ categories: categories });
  },
});

export default categoriesSlice;
