export type TestDetails = {
    name: string; 
    description: string; 
    duration: string; 
    type: {
        multipleChoice: boolean; 
        essay: boolean; 
    
    };
};
