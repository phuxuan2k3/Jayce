type SkillAssessment = {
    name: string;
    rating: number;
}

export type TestEvaluateProps = {
    title: string;
    comment: string;
    skills: SkillAssessment[];
    completionOverview: {
        excellentCompletion: number;
        satifactoyCompletion: number;
        needsImprovement: number;
    }
}

export const mockData: TestEvaluateProps = {
    title: "Test Evaluation",
    comment: "Great job! You have shown excellent understanding of the concepts. Keep up the good work and continue to build on your strengths. There are a few areas that need improvement, but overall, you did very well.",
    skills: [
        { name: "JavaScript", rating: 4.5 },
        { name: "React", rating: 4.0 },
        { name: "CSS", rating: 3.5 },
    ],
    completionOverview: {
        excellentCompletion: 50,
        satifactoyCompletion: 30,
        needsImprovement: 20,
    },
};