import { Role } from "../../features/auth/types/auth";
import { CandidateCore, UserCore } from "../core/user.model";

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


export const mockUsers: UserCore[] = [
	{
		id: "5",
		username: "charlie_davis",
		email: "charlie.davis@example.com",
		metadata: { joinDate: "2023-02-28", department: "Sales" },
		fullname: "Charlie Davis",
		avatarPath: "/avatars/charlie_davis.jpg",
		role: Role.Candidate,
	},
	{
		id: "6",
		username: "diana_martinez",
		email: "diana.martinez@example.com",
		metadata: { joinDate: "2023-05-12", department: "HR" },
		fullname: "Diana Martinez",
		avatarPath: "/avatars/diana_martinez.jpg",
		role: Role.Candidate,
	},
	{
		id: "7",
		username: "frank_johnson",
		email: "frank.johnson@example.com",
		metadata: { joinDate: "2022-11-18", department: "Finance" },
		fullname: "Frank Johnson",
		avatarPath: "/avatars/frank_johnson.jpg",
		role: Role.Candidate,
	},
	{
		id: "8",
		username: "grace_lee",
		email: "grace.lee@example.com",
		metadata: { joinDate: "2023-01-30", department: "Design" },
		fullname: "Grace Lee",
		avatarPath: "/avatars/grace_lee.jpg",
		role: Role.Manager,
	},
	{
		id: "9",
		username: "henry_clark",
		email: "henry.clark@example.com",
		metadata: { joinDate: "2022-09-14", department: "Operations" },
		fullname: "Henry Clark",
		avatarPath: "/avatars/henry_clark.jpg",
		role: Role.Manager,
	}
];