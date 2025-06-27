import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/authSlice.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import testApi from '../infra-test/api/test.api.ts';
import promptApi from '../infra-test/api/prompt.api.ts';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authApi from '../features/auth/api/auth.api.ts';
import ekkoApi from '../features/scenarios/apis/base/ekko.api';
import chronobreakApi from '../features/scenarios/apis/base/chronobreak.api';
import logoutApi from '../features/auth/api/logout.api.ts';
import interviewApi from '../features/interviews/api/interview.api.ts';
import fetchSlice from './fetchSlice.ts';
import deleteExamSlice from '../infra-test/stores/deleteExamSlice.ts';
import paymentApi from '../features/payment/api/payment.api.ts';
import promptTuningApi from '../infra-test/base/prompt-tuning.api.ts';
import fetchStateSlice from '../infra-test/stores/fetchStateSlice.ts';


const authPersistConfig = {
	key: 'auth',
	storage,
	blacklist: ['isAuthenticated'],
};

// Create the root reducer so it can be used in configureStore
const rootReducer = combineReducers({
	authApi: authApi.reducer,
	logoutApi: logoutApi.reducer,
	ekkoApi: ekkoApi.reducer,
	chronobreakApi: chronobreakApi.reducer,
	interviewApi: interviewApi.reducer,
	promptTuningApi: promptTuningApi.reducer,
	[testApi.reducerPath]: testApi.reducer,
	[promptApi.reducerPath]: promptApi.reducer,
	paymentApi: paymentApi.reducer,

	// Custom reducers
	auth: persistReducer(authPersistConfig, authReducer),
	[fetchSlice.reducerPath]: fetchSlice.reducer,
	[deleteExamSlice.reducerPath]: deleteExamSlice.reducer,
	[fetchStateSlice.reducerPath]: fetchStateSlice.reducer,
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
				.concat(ekkoApi.middleware)
				.concat(chronobreakApi.middleware)
				.concat(authApi.middleware)
				.concat(logoutApi.middleware)
				.concat(interviewApi.middleware)
				.concat(promptTuningApi.middleware)
				.concat(paymentApi.middleware)
	,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

setupListeners(store.dispatch);

export default store;
