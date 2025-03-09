import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../global/authSlice';
import authApi from '../features/Auth/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import testApi from '../features/Test/api/test.api';
import accountApi from '../features/Account/account.api';
import aiAPI from '../features/Test/api/AI.api';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth'],
};

// Create the root reducer so it can be used in configureStore
const rootReducer = combineReducers({
	auth: authReducer,
	authApi: authApi.reducer,
	testApi: testApi.reducer,
	aiApi: aiAPI.reducer,
	accountApi: accountApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware:
		(getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			})
				.concat(authApi.middleware)
				.concat(testApi.middleware)
				.concat(aiAPI.middleware)
				.concat(accountApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

setupListeners(store.dispatch);

// Only used in App.tsx
export default store;