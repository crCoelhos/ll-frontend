import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/auth-slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { searchReducer } from "./slices/search-slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "search"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
