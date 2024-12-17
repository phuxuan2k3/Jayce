export type Answer ={
    question: string;      
    options: string[];      
    chosenAnswer: number;  
    correctAnswer: number; 
    point: number;         
}

export type Submission={
    testNumber: number;    
    submitter: string;     
    testName: string;   
    answer:Answer[];
}   