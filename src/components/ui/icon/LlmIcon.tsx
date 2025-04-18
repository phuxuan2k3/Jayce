import React from 'react';

const LlmIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="white"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props} // Allows passing className, style, etc.
	>
		{/* Speech bubble shape */}
		<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
		{/* Lines inside representing text */}
		<line x1="7" y1="7" x2="17" y2="7"></line>
		<line x1="7" y1="11" x2="14" y2="11"></line>
	</svg>
);

export default LlmIcon;