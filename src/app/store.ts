import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../global/authSlice';
import authApi from '../features/Auth/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import testApi from '../features/Test/test.api';
import accountApi from '../features/Account/account.api';
import aiAPI from '../features/Test/AI.api';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import registerAPI from '../pages/Authen/register/register.api';
import ekkoApi from '../features/Scenario/ekko.api';
import chronobreakApi from '../features/Scenario/chronobreak.api';
import loginAPI from '../features/Test/login.api';

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
	ekkoApi: ekkoApi.reducer,
	chronobreakApi: chronobreakApi.reducer,
	loginAPI: loginAPI.reducer,
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
				.concat(registerAPI.middleware)
				.concat(ekkoApi.middleware)
				.concat(chronobreakApi.middleware)
				.concat(loginAPI.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

setupListeners(store.dispatch);

export default store;