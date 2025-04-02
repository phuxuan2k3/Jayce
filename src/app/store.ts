import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/store/authSlice';
import authApi from '../features/Auth/api/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import testApi from './bases/test.api';
import promptApi from './bases/prompt.api';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import currentAttemptReducer from '../features/tests/stores/currentAttemtpSlice';
import authRestApi from '../features/Auth/api/authRestApi';
import accountApi from '../features/Account/account.api';
import ekkoApi from '../features/Scenario/apis/base/ekko.api';
import chronobreakApi from '../features/Scenario/apis/base/chronobreak.api';
import testPersistReducer from '../features/tests/stores/testPersistSlice';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth'],
};

// Create the root reducer so it can be used in configureStore
const rootReducer = combineReducers({
	authApi: authApi.reducer,
	authRestApi: authRestApi.reducer,
	testApi: testApi.reducer,
	aiApi: promptApi.reducer,
	accountApi: accountApi.reducer,
	ekkoApi: ekkoApi.reducer,
	chronobreakApi: chronobreakApi.reducer,

	// Custom reducers
	auth: authReducer,
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
				.concat(accountApi.middleware)
				.concat(ekkoApi.middleware)
				.concat(chronobreakApi.middleware)
				.concat(authRestApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

setupListeners(store.dispatch);

export default store;