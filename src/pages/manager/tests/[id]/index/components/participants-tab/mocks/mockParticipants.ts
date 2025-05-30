import { Participant } from '../types/participants';

// Mock data for testing
export const mockParticipants: Participant[] = [
	{
		user: {
			id: '1',
			username: 'john_doe',
			email: 'john.doe@example.com',
			metadata: {},
			fullname: 'John Doe',
			avatarPath: '/avatar/1.png'
		},
		attemptsAggregate: {
			totalAttempts: 3,
			averageScore: 85.5,
			highestScore: 92,
			lowestScore: 78,
			averageTime: 1800, // 30 minutes
			rank: 1,
			candidateId: '1'
		},
	},
	{
		user: {
			id: '2',
			username: 'jane_smith',
			email: 'jane.smith@example.com',
			metadata: {},
			fullname: 'Jane Smith',
			avatarPath: '/avatar/default.png'
		},
		attemptsAggregate: {
			totalAttempts: 2,
			averageScore: 78.0,
			highestScore: 85,
			lowestScore: 71,
			averageTime: 2100, // 35 minutes
			rank: 2,
			candidateId: '2'
		},
	},
	{
		user: {
			id: '3',
			username: 'mike_wilson',
			email: 'mike.wilson@example.com',
			metadata: {},
			fullname: 'Mike Wilson',
			avatarPath: '/avatar/default.png'
		},
		attemptsAggregate: {
			totalAttempts: 4,
			averageScore: 72.5,
			highestScore: 88,
			lowestScore: 65,
			averageTime: 2400, // 40 minutes
			rank: 3,
			candidateId: '3'
		}
	},
	{
		user: {
			id: '4',
			username: 'sarah_johnson',
			email: 'sarah.johnson@example.com',
			metadata: {},
			fullname: 'Sarah Johnson',
			avatarPath: '/avatar/default.png'
		},
		attemptsAggregate: {
			totalAttempts: 1,
			averageScore: 69.0,
			highestScore: 69,
			lowestScore: 69,
			averageTime: 1950, // 32.5 minutes
			rank: 4,
			candidateId: '4'
		}
	},
	{
		user: {
			id: '5',
			username: 'alex_brown',
			email: 'alex.brown@example.com',
			metadata: {},
			fullname: 'Alex Brown',
			avatarPath: '/avatar/default.png'
		},
		attemptsAggregate: {
			totalAttempts: 5,
			averageScore: 81.2,
			highestScore: 94,
			lowestScore: 62,
			averageTime: 2700, // 45 minutes
			rank: 5,
			candidateId: '5'
		}
	}
];
