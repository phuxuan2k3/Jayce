import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/authSlice.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authApi from '../features/auth/api/auth.api.ts';
import logoutApi from '../features/auth/api/logout.api.ts';
import interviewApi from '../features/interviews/api/interview.api.ts';
import fetchSlice from './fetchSlice.ts';
import paymentApi from '../features/payment/api/payment.api.ts';
import testApi from '../features/tests/api/test.api.ts';
import promptApi from '../features/tests/api/prompt.api.ts';
import testDoSlice from '../features/tests/stores/testDoSlice.ts';
import speechToTextApi from '../features/interviews/api/speech-to-text.api.ts';

const authPersistConfig = {
	key: 'auth',
	storage,
	blacklist: ['isAuthenticated'],
};

const testDoPersistConfig = {
	key: 'testDo',
	storage,
};

// Create the root reducer so it can be used in configureStore
const rootReducer = combineReducers({
	authApi: authApi.reducer,
	logoutApi: logoutApi.reducer,
	interviewApi: interviewApi.reducer,
	[testApi.reducerPath]: testApi.reducer,
	[promptApi.reducerPath]: promptApi.reducer,
	[speechToTextApi.reducerPath]: speechToTextApi.reducer,
	paymentApi: paymentApi.reducer,

	// Custom reducers
	auth: persistReducer(authPersistConfig, authReducer),
	[testDoSlice.reducerPath]: persistReducer(testDoPersistConfig, testDoSlice.reducer),
	[fetchSlice.reducerPath]: fetchSlice.reducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware:
		(getDefaultMiddleware) =>
			getDefaultMiddleware({
				// Disable serializable check for redux-persist
				serializableCheck: false,
			})
				.concat(authApi.middleware)
				.concat(testApi.middleware)
				.concat(promptApi.middleware)
				.concat(logoutApi.middleware)
				.concat(interviewApi.middleware)
				.concat(paymentApi.middleware)
	,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

setupListeners(store.dispatch);

export default store;
