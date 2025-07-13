import { Pagination as MUIPagination, ThemeProvider, createTheme } from "@mui/material";
import { useLanguage } from "../../../LanguageProvider";

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

export default function MyPaginationSection({
	page,
	perPage,
	total,
	totalPages,
	onPageChange,
}: {
	page: number;
	perPage: number;
	total?: number;
	totalPages?: number;
	onPageChange: (page: number) => void;
}) {
	const { t } = useLanguage();

	const isLoading = totalPages == null || total == null;
	return (
		<div className="flex flex-col items-center justify-center w-full p-4">
			<ThemeProvider theme={theme}>
				<MUIPagination
					disabled={isLoading}
					count={totalPages}
					page={page}
					variant='outlined'
					color="bluechill"
					onChange={(_, page) => onPageChange(page)} />
			</ThemeProvider>

			<span className="text-sm text-gray-500 mt-4 italic w-full text-center">
				{t("pagination_total_items").replace("{{total}}", total?.toString() || "0").replace("{{perPage}}", perPage.toString())}
			</span>
		</div>
	)
}
