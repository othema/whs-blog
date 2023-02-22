import { AppShell, MantineProvider, useMantineTheme } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Outlet } from "react-router-dom";
import ShellHeader from "./components/shell/ShellHeader";
import ShellNavbar from "./components/shell/ShellNavbar";

import "./css/greycliff.css";

function Layout() {
  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        headings: {
          fontFamily: "Greycliff CF",
        },
      }}
		>
			<NotificationsProvider>
				<AppShell
					navbar={<ShellNavbar />}
					header={<ShellHeader />}
					style={{ backgroundColor: "white" }}
					padding={0}
				>
					<Outlet />
				</AppShell>
			</NotificationsProvider>
    </MantineProvider>
  );
}

export default Layout;
