import { configureStore } from "@reduxjs/toolkit";
import homeDocSliceReducer from "./src/slices/HomeDocSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ immutableCheck: false }),
  ],
  reducer: {
    home: homeDocSliceReducer,
  },
});
