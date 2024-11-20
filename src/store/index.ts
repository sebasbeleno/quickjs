import { configureStore } from '@reduxjs/toolkit';
import FilesReducer from './slices/filesSlice';

export const store = configureStore({
    reducer: {
        files: FilesReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
