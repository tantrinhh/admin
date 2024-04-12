import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../RootReducer";
import { thunkExtras } from "./thunk-extras";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [ "product" ],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: thunkExtras } }),
});
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export default store;
