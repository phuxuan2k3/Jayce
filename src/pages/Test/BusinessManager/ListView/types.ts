export interface SubmissionItem {
    candidateId: string;
    createAt: string;
    completeness: number;
    score: number ;
  }
  
  export interface SubmissionOverView {
    testName: string;
    totalPoints: number;
    difficulty:string;
    minutesToAnswer:number;
  }