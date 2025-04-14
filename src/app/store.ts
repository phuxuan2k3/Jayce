import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/authSlice.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import testApi from '../features/tests/base/test.api';
import promptApi from '../features/tests/base/prompt.api';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import currentAttemptReducer from '../features/tests/stores/currentAttemtpSlice';
import authApi from '../features/auth/api/auth.api';
import ekkoApi from '../features/scenarios/apis/base/ekko.api';
import chronobreakApi from '../features/scenarios/apis/base/chronobreak.api';
import testPersistReducer from '../features/tests/stores/testPersistSlice';
import logoutApi from '../features/auth/api/logout.api.ts';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth'],
};

const authPersistConfig = {
	key: 'auth',
	storage,
	blacklist: ['isAuthenticated'],
};

// Create the root reducer so it can be used in configureStore
const rootReducer = combineReducers({
	authApi: authApi.reducer,
	logoutApi: logoutApi.reducer,
	testApi: testApi.reducer,
	aiApi: promptApi.reducer,
	ekkoApi: ekkoApi.reducer,
	chronobreakApi: chronobreakApi.reducer,

	// Custom reducers
	auth: persistReducer(authPersistConfig, authReducer),
	currentAttempt: currentAttemptReducer,
	testPersist: testPersistReducer,
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
				.concat(promptApi.middleware)
				.concat(ekkoApi.middleware)
				.concat(chronobreakApi.middleware)
				.concat(authApi.middleware)
				.concat(logoutApi.middleware)
	,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

setupListeners(store.dispatch);

export default store;

// TODO: global error display / page navigation middleware
// https://owensiu.medium.com/rtk-query-how-to-centralize-error-handling-40c28bb48d5d