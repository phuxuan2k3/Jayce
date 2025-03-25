import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import authApi from '../../features/Auth/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import testApi from '../../features/Test/api/test.api';
import accountApi from '../../features/Account/account.api';
import aiAPI from '../../features/Test/api/AI.api';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import registerAPI from '../../pages/Authen/register/register.api';
import currentAttemptReducer from '../../features/Test/reducers/currentAttemtpSlice';

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
	registerAPI: registerAPI.reducer,

	// Custom reducers
	currentAttempt: currentAttemptReducer,
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
				.concat(accountApi.middleware)
				.concat(registerAPI.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

setupListeners(store.dispatch);

export default store;