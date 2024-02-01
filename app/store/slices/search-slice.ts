import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchString: string | null;
  searchFilter: string | null;
}

const initialState: SearchState = {
  searchString: "",
  searchFilter: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchString: (state, action: PayloadAction<string | null>) => {
      state.searchString = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string | null>) => {
      state.searchFilter = action.payload;
    },
    resetAll: (state) => {
      state.searchString = null;
      state.searchFilter = null;
    },
  },
});

export const { reducer: searchReducer, actions: searchActions } = searchSlice;
