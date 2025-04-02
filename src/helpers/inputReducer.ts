import * as React from "react";

export function formInputReducer<T>(state: T, event: React.ChangeEvent<
	HTMLInputElement |
	HTMLTextAreaElement
>) {
	return {
		...state,
		[event.target.name]: event.target.value
	};
};
