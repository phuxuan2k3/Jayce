import React from 'react';
import { Navigate } from 'react-router-dom';
import paths from '../../router/paths';
import { useAppSelector } from '../../app/hooks';
import { Role } from '../../features/auth/types/auth';
import { authSelectors } from '../../features/auth/store/authSlice';

type RoleAlternativeUrl = {
	role: Role;
	alternativeUrl: string;
}

type Props = {
	children: React.ReactNode;
	roles: Role[];
	exclude?: boolean;
	alternativeUrl?: string | RoleAlternativeUrl[];
}

const RoleGuard: React.FC<Props> = ({
	children,
	roles,
	exclude = false,
	alternativeUrl = paths.auth.LOGIN,
}) => {
	const role = useAppSelector(authSelectors.selectRole);
	const _alternativeUrl = typeof alternativeUrl === 'string'
		? alternativeUrl
		: (alternativeUrl as RoleAlternativeUrl[]).find(a => a.role === role)?.alternativeUrl || paths.auth.LOGIN;
	const alternativeLink = <Navigate to={_alternativeUrl} />
	let returnChildren = children;
	if (exclude == false && roles.includes(role) == false) {
		returnChildren = alternativeLink;
	} else if (exclude == true && roles.includes(role) == true) {
		returnChildren = alternativeLink;
	}
	return <>{returnChildren}</>;
};

export default RoleGuard;