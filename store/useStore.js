import { create } from "zustand";
import categoriesSlice from "../functions/categoriesSlice";
import searchSlice from "../functions/searchSlice";
const useStore = create((set, get) => ({
  ...categoriesSlice(set, get),
  ...searchSlice(set, get),
}));
export default useStore;
