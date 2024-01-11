import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  name: string;
  email: string;
  token: string;
}

const initialState: AuthState = {
  name: "Unknown",
  email: "Unknown",
  token: "Unknown",
};

function logOut() {
  return initialState;
}

function logIn() {
  return {
    name: "Rogerio Sergio",
    email: "rogerio@sergio.com",
    token: "1234567890",
  };
}

// function login(state: AuthState, action: PayloadAction) {
//   state.name = action.payload.name;
//   state.email = action.payload.email;
//   state.token = action.payload.token;
// }

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn,
    logOut,
  },
});

export const { reducer: authReducer, actions } = authSlice;
