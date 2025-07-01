export default function TitleSkeleton() {
	return (
		<div className="flex flex-col gap-2 w-[500px]">
			<div className="h-8 w-2/3 bg-gray-200 animate-pulse rounded" /> {/* Title skeleton */}
			<div className="h-4 w-1/2 bg-gray-100 animate-pulse rounded" /> {/* Description skeleton */}
		</div>
	)
}
