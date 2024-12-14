export type SubmissionOverView={
    testName: string; 
    totalPoints: number;
}
export type SubmissionItem ={
    submitterId: string;
    submitter: string;
    date: string; 
    completeness: number; 
    graded: number; 
}