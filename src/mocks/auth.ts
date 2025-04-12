import { AuthResponse, Role } from '../features/auth/types/auth';

// @ts-ignore
const candidateAuthResponse: AuthResponse = {
	token_info: {
		access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockAccessToken',
		refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockRefreshToken',
		role: Role.Candidate,
		safe_id: 'safe12345',
		user_id: 'user12345',
	},
	user: {
		username: 'johndoe',
		email: 'johndoe@example.com',
		role: Role.Candidate,
		id: 'user12345',
		metadata: {
			fullname: 'John Doe',
			company: 'Tech Solutions Inc.',
			country: 'United States',
			jobTitle: 'Software Engineer',
			avatarPath: '/images/avatars/johndoe.png',
		},
	},
};

const managerAuthResponse: AuthResponse = {
	token_info: {
		access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockManagerAccessToken',
		refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockManagerRefreshToken',
		role: Role.Manager,
		safe_id: 'safe67890',
		user_id: 'user67890',
	},
	user: {
		username: 'janedoe',
		email: 'janedoe@example.com',
		role: Role.Manager,
		id: 'user67890',
		metadata: {
			fullname: 'Jane Doe',
			company: 'Business Solutions Ltd.',
			country: 'Canada',
			jobTitle: 'Project Manager',
			avatarPath: '/images/avatars/janedoe.png',
		},
	}
};

// Decide which mock response to be used
// const mockAuthResponse = candidateAuthResponse;
const mockAuthResponse = managerAuthResponse;

export default mockAuthResponse;