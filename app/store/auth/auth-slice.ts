import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchActions } from "../slices/search-slice";

interface AuthState {
  token: string | null;
  name: string | null;
  email: string | null;
  roleId: string | null;
}

const initialState: AuthState = {
  token: null,
  name: null,
  email: null,
  roleId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.roleId = action.payload.roleId;
    },
    logout: (state) => {
      state.token = null;
      state.name = null;
      state.email = null;
      state.roleId = null;
    },
  },
});
export const { reducer: authReducer, actions: authActions } = authSlice;
