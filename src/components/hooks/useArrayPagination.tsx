import { useState } from "react";

export default function useArrayPagination<T>(array: Array<T>, perPage: number = 10) {
	const [page, setPage] = useState(1);

	const totalPages = Math.ceil(array.length / perPage);

	const indexOfLastQuestion = page * perPage;
	const indexOfFirstQuestion = indexOfLastQuestion - perPage;
	const pageItems = array.slice(indexOfFirstQuestion, indexOfLastQuestion);

	return {
		totalPages,
		page,
		setPage,
		pageItems,
		perPage,
	};
}
