import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import todoSlice from '@/redux/slice/todoSlice';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, todoSlice);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export const persist = persistStore(store);
