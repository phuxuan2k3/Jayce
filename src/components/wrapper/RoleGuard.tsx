import React from 'react';
import { Navigate } from 'react-router-dom';
import { Role } from '../../app/enum';
import paths from '../../router/paths';
import { useAppSelector } from '../../app/hooks';
import { selectRole } from '../../features/Auth/store/authSlice';

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
	const role = useAppSelector(selectRole);
	const _alternativeUrl = typeof alternativeUrl === 'string'
		? alternativeUrl
		: (alternativeUrl as RoleAlternativeUrl[]).find(a => a.role === role)?.alternativeUrl || paths.auth.LOGIN;
	const alternativeLink = <Navigate to={_alternativeUrl} />
	if (exclude == false) {
		if (roles.includes(role)) {
			return children;
		}
		return alternativeLink;
	} else {
		if (roles.includes(role)) {
			return alternativeLink;
		}
		return children;
	}
};

export default RoleGuard;