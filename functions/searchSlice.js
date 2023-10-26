const searchSlice = (set, get) => ({
  isSearching: false,
  setIsSearching: (bool) => {
    set({ isSearching: bool });
  },
  searchVal: "",
  setSearchVal: (enteredVal) => {
    set({ searchVal: enteredVal });
  },
});

export default searchSlice;
