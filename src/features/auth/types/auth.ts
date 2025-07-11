export type AuthResponse = {
	token_info: {
		access_token: string;
		refresh_token: string;
		role: Role;
		safe_id: string;
		user_id: string;
	};
	user: {
		username: string;
		email: string;
		role: Role;
		id: string;
		metadata: any;
	};
};

export type RefreshRequest = {
	token_info: {
		access_token: string;
		refresh_token: string;
		role: Role;
		user_id: string;
		safe_id: string;
	};
};

export type RefreshResponse = {
	token_info: {
		access_token: string;
		refresh_token: string;
		role: Role;
		safe_id: string;
		user_id: string;
	};
};

export enum Role {
	None = "ROLE_UNKNOWN",
	Candidate = "ROLE_CANDIDATE",
	Manager = "ROLE_BUSINESS_MANAGER",
}

export type Local = {
	username: string;
	email: string;
	password: string;
	confirm_password: string;
	otp: string;
};

export type Metadata = {
	fullname: string;
	company: string;
	country: string;
	jobTitle: string;
	avatarPath: string;
};

export type Metadata2 = {
	fullname?: string;
	company?: string;
	country?: string;
	jobTitle?: string;
	avatarPath?: string;
	gender?: string;
	birthday?: string;
	summary?: string;
	website?: string;
	linkedIn?: string;
	education?: string;
};

