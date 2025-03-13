import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

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

type MyPaginationProps = {
	totalPage?: number;
	initialPage?: number;
	onPageChange?: (page: number) => void;
};

const MyPagination: React.FC<MyPaginationProps> = ({ totalPage, initialPage, onPageChange }) => {
	const [page, setPage] = useState(initialPage ?? 1);
	const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
		if (onPageChange != null) {
			onPageChange(value);
		}
	};
	return (
		<ThemeProvider theme={theme}>
			<Pagination
				disabled={!totalPage || totalPage === 0}
				count={totalPage ?? 0}
				page={page}
				variant='outlined'
				color="bluechill"
				onChange={handleChange} />
		</ThemeProvider>
	);
}


export default MyPagination;