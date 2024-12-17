import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../global/authSlice';
import authApi from '../features/Auth/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import testApi from '../features/Test/test.api';
import accountApi from '../features/Account/account.api';


// Create the root reducer so it can be used in configureStore
const rootReducer = combineReducers({
	auth: authReducer,
	authApi: authApi.reducer,
	testApi: testApi.reducer,
	accountApi: accountApi.reducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware:
		(getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			})
				.concat(authApi.middleware)
				.concat(testApi.middleware)
				.concat(accountApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

setupListeners(store.dispatch);

// Only used in App.tsx
export default store;