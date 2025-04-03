export default function SkeletonLoading({ className }: { className?: string }) {
	return <div className={`bg-gray-300 animate-pulse rounded ${className}`} />;
};

