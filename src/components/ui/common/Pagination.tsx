import * as React from 'react';
import { useState } from "react";
import { Pagination as MUIPagination, ThemeProvider, createTheme } from "@mui/material";

declare module '@mui/material/styles' {
	interface Palette {
		bluechill: Palette['primary'];
	}

	interface PaletteOptions {
		bluechill?: PaletteOptions['primary'];
	}
}

declare module "@mui/material/Pagination" {
	interface PaginationPropsColorOverrides {
		bluechill: true;
	}
}

let theme = createTheme({});
theme = createTheme({
	palette: {
		bluechill: theme.palette.augmentColor({
			color: {
				main: '#0C8990'
			},
			name: 'bluechill'
		}),
	}
});

interface Props {
	totalPage: number;
	initialPage?: number;
	onPageChange?: (page: number) => void;
}

export default function Pagination({
	totalPage,
	initialPage,
	onPageChange
}: Props) {
	const [page, setPage] = useState(initialPage ?? 1);
	const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
		if (onPageChange != null) {
			onPageChange(value);
		}
	};
	return (
		<ThemeProvider theme={theme}>
			<MUIPagination
				count={totalPage}
				page={page}
				variant='outlined'
				color="bluechill"
				onChange={handleChange} />
		</ThemeProvider>
	);
}