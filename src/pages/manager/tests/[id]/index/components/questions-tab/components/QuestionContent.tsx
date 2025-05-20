import React from 'react';

interface QuestionContentProps {
	text: string;
}

const QuestionContent: React.FC<QuestionContentProps> = ({ text }) => {
	return (
		<>
			<hr className='border-primary-toned-300 my-2' />
			<p className="font-bold"><span>Question</span>: {text}</p>
			<hr className='border-primary-toned-300 my-2' />
		</>
	);
};

export default QuestionContent;
