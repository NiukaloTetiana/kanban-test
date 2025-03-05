import { configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
import {
  persistStore,
  // persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { issuesReducer } from "./issues/issuesSlice";

// const persistConfig = {
//   key: "root",
//   storage,
// };

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
