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
	toeken_info: {
		access_token: string;
		refresh_token: string;
		role: Role;
		user_id: string;
		safe_id: string;
	};
}; export enum Role {
	None = 0,
	Candidate = 1,
	Manager = 2
}

type Local = {
	username: string;
	email: string;
	password: string;
	confirm_password: string;
	otp: string;
};

type Metadata = {
	fullname: string;
	company: string;
	country: string;
	jobTitle: string;
	avatarPath: string;
};