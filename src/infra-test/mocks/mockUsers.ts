import { CandidateCore } from "../core/user.model";

export const mockCandidates: CandidateCore[] = [
	{
		id: "1",
		username: "john_doe",
		email: "john.doe@example.com",
		metadata: { joinDate: "2023-01-15", department: "Engineering" },
		fullname: "John Doe",
		avatarPath: "/avatars/john_doe.jpg",
	},
	{
		id: "2",
		username: "jane_smith",
		email: "jane.smith@example.com",
		metadata: { joinDate: "2022-08-20", department: "Management" },
		fullname: "Jane Smith",
		avatarPath: "/avatars/jane_smith.jpg"
	},
	{
		id: "3",
		username: "bob_wilson",
		email: "bob.wilson@example.com",
		metadata: { joinDate: "2023-03-10", department: "Marketing" },
		fullname: "Bob Wilson",
		avatarPath: "/avatars/bob_wilson.jpg"
	},
	{
		id: "4",
		username: "alice_brown",
		email: "alice.brown@example.com",
		metadata: { joinDate: "2022-12-05", department: "Support" },
		fullname: "Alice Brown",
		avatarPath: "/avatars/alice_brown.jpg"
	},
	{
		id: "5",
		username: "charlie_davis",
		email: "charlie.davis@example.com",
		metadata: { joinDate: "2023-02-28", department: "Sales" },
		fullname: "Charlie Davis",
		avatarPath: "/avatars/charlie_davis.jpg"
	}
]
