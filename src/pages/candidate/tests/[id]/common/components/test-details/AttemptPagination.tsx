import React from 'react';

interface AttemptPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (pageNum: number) => void;
}

const AttemptPagination: React.FC<AttemptPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
	if (totalPages <= 1) return null;

	return (
		<div className="flex justify-center mt-4">
			<div className="flex space-x-1">
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
					<button
						key={pageNum}
						className={`w-8 h-8 rounded-full flex items-center justify-center ${pageNum === currentPage
								? "bg-primary text-white"
								: "bg-white text-primary border border-primary"
							}`}
						onClick={() => onPageChange(pageNum)}
					>
						{pageNum}
					</button>
				))}
			</div>
		</div>
	);
};

export default AttemptPagination;