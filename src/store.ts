import { create } from "zustand";

interface BookQuery {
  searchText?: string;
}

interface BookQueryStore {
  bookQuery: BookQuery;
  setSearchText: (searchText: string) => void;
}

const useBookQueryStore = create<BookQueryStore>((set) => ({
  bookQuery: {},
  setSearchText: (searchText) => set({ bookQuery: { searchText } }),
}));

export default useBookQueryStore;
