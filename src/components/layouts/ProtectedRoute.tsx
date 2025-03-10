import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { noAuth } from '../../app/env';
import { selectIsAuthenticated } from '../../app/redux/authSlice';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
	if (noAuth) {
		return children;
	}
	const isAuth = useSelector(selectIsAuthenticated);
	if (!isAuth) {
		return <Navigate to="/login" />;
	}
	return children;
};

export default ProtectedRoute;