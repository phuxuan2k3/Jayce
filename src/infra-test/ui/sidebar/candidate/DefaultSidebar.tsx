import SidebarActions from "../primitive/SidebarActions";

export default function DefaultSidebarActions() {
	return (
		<SidebarActions>
			<SidebarActions.BrowseTemplates />
			<SidebarActions.GenerateTest />
			<SidebarActions.JoinTest />
		</SidebarActions>
	);
}
