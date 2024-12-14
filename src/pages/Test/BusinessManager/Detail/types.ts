export type TestInfo ={
    testNumber: number;    
    submitter: string;     
    testName: string;      
};

export type Answer ={
    question: string;      
    options: string[];      
    chosenAnswer: number;  
    correctAnswer: number; 
    point: number;         
}