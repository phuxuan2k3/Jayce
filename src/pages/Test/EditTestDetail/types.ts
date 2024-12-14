export type TestDetails = {
    testId:string;
    name: string; 
    description: string; 
    duration: string; 
    type: {
        multipleChoice: boolean; 
        essay: boolean; 
    
    };
};
