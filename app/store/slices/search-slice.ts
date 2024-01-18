import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchString: string;
  searchFilter: string;
}

const initialState: SearchState = {
  searchString: "",
  searchFilter: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.searchFilter = action.payload;
    },
  },
});

export const { reducer: searchReducer, actions: searchActions } = searchSlice;
