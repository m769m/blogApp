import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { getApi } from "./get-api";
import saveUser from "./slices/user";
import listArticle from "./slices/list-article";

const rootReducer = combineReducers({
  [getApi.reducerPath]: getApi.reducer,
  saveUser,
  listArticle,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getApi.middleware),
});

setupListeners(store.dispatch);
