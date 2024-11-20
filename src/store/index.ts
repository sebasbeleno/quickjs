import { combineReducers, configureStore } from '@reduxjs/toolkit';
import FilesReducer from './slices/filesSlice';
import { fileListenerMiddleware } from './middlewares/filesMiddleware';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// todo: create custom storage for idb
const persistConfig = {
    key: 'root',
    storage: storage,
};

const rootReducer = combineReducers({
    files: FilesReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare().prepend(fileListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);