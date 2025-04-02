export interface SubmissionItem {
    candidateId: string;
    createAt: string;
    completeness: number;
    score: number ;
    attemptID: string;
  }
  
  export interface SubmissionOverView {
    testName: string;
    totalPoints: number;
    difficulty:string;
    minutesToAnswer:number;
  }