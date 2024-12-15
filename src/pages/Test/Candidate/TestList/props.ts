export type TestListProps = {
    suggestedTags: string[];
}

export type TestDisplayProps = {
    id: string;
    company: string;
    createdAt: string;
    title: string;
    description: string;
    minutesToAnswer: number;
    tags: string[];
    answersCount: number;
}