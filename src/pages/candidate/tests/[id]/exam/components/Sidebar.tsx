import SidebarActions from "../../../../../../infra-test/ui/sidebar/primitive/SidebarActions";

export default function Sidebar() {
	return (
		<SidebarActions>
			<SidebarActions.BrowseTemplates />
			<SidebarActions.GenerateTest />
			<SidebarActions.JoinTest />
		</SidebarActions>
	);
}
