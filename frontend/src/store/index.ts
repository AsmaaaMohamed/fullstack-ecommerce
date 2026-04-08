import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import authReducer from "./auth/authSlice";
import currencyReducer from "./currency/currencySlice";
import storage from "redux-persist/lib/storage";
import {persistStore , persistReducer , FLUSH , REHYDRATE ,PAUSE ,PERSIST, PURGE , REGISTER} from "redux-persist"
import { storeApiSlice } from "./storeApiSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth", "currency"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};

// nested persist
const cartPersistConfig ={
    key:"cart",
    storage,
    whitelist:["items"],
}

const currencyPersistConfig = {
  key: "currency",
  storage,
  whitelist: ["value"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  [storeApiSlice.reducerPath]: storeApiSlice.reducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  currency: persistReducer(currencyPersistConfig, currencyReducer),
});
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const reduxPersistActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [...reduxPersistActions],
      },
    }).concat(storeApiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
const persistor = persistStore(store)
export { store , persistor};
