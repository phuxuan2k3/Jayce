type SkillAssessment = {
    name: string;
    rating: number;
}

export type ReviewSubmission = {
    title: string;
    comment: string;
    skills: SkillAssessment[];
    completionOverviews: {
        excellentCompletion: number;
        satifactoyCompletion: number;
        needsImprovement: number;
    }
}