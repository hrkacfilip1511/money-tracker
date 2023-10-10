import { create } from "zustand";
import categoriesSlice from "../functions/categoriesSlice";
const useStore = create((set, get) => ({
  ...categoriesSlice(set, get),
}));
export default useStore;
