import React from 'react'
import { FetchError } from '../../../../../../../app/server-error'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'

export default function FetchStateContent<T>({
	isLoading,
	error,
	data,
	childrenFactory,
}: {
	isLoading: boolean;
	error?: FetchBaseQueryError | SerializedError | unknown;
	data?: T;
	childrenFactory: (data: T) => React.ReactNode;
}) {
	if (error != null) throw new FetchError(error);
	if (isLoading) return (
		<div className="flex justify-center items-center h-64">
			<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
		</div>
	);
	if (data == null) return (
		<div className="flex justify-center items-center h-64">
			<div className="bg-white rounded-lg shadow-md p-6 text-center">
				<p className="text-gray-600">No data found.</p>
			</div>
		</div>
	);
	return childrenFactory(data);
}
