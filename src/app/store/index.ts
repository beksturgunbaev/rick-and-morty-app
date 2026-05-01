import { baseApi } from "../api/baseApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // Добавляем генерируемый редьюсер как специфичный слайс
    [baseApi.reducerPath]: baseApi.reducer,
  },
  // Добавление middleware необходимо для кэширования, инвалидации и других функций rtk-query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Типы для использования в приложении
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
