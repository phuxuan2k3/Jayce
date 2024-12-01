type SkillAssessment = {
    name: string;
    rating: number;
}

export type ReviewSubmission = {
    title: string;
    comment: string;
    skills: SkillAssessment[];
    completionOverview: {
        excellentCompletion: number;
        satifactoyCompletion: number;
        needsImprovement: number;
    }
}