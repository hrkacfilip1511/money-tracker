const categoriesSlice = (set, get) => ({
  session: null,
  setSession: (session) => {
    set({ session: session });
  },
  categories: [],
  setCategories: (categories) => {
    set({ categories: categories });
  },
  isMobile: true,
  setIsMobile: (boolVal) => {
    set({ isMobile: boolVal });
  },
});

export default categoriesSlice;
