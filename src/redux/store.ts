import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import { issuesReducer } from "../redux";

const persistConfig = {
  key: "issues",
  version: 1,
  storage,
  whitelist: ["issues"],
};

const persistedIssuesReducer = persistReducer(persistConfig, issuesReducer);

export const store = configureStore({
  reducer: {
    issues: persistedIssuesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
