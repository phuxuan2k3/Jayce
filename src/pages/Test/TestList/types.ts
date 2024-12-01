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

export const mockData: TestDisplayProps[] = [
    {
        id: '1',
        company: 'Tech Corp',
        createdAt: '2023-01-01',
        title: 'JavaScript Basics',
        description: 'A test on the basics of JavaScript.',
        minutesToAnswer: 30,
        tags: ['JavaScript', 'Basics'],
        answersCount: 10,
    },
    {
        id: '2',
        company: 'Innovate Ltd',
        createdAt: '2023-02-15',
        title: 'Advanced TypeScript',
        description: 'A test on advanced TypeScript concepts.',
        minutesToAnswer: 45,
        tags: ['TypeScript', 'Advanced'],
        answersCount: 15,
    },
    {
        id: '3',
        company: 'Dev Solutions',
        createdAt: '2023-03-10',
        title: 'React Fundamentals',
        description: 'A test on the fundamentals of React.',
        minutesToAnswer: 40,
        tags: ['React', 'Fundamentals'],
        answersCount: 20,
    },
];