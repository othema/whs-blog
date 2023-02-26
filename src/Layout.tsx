import { AppShell, MantineProvider, useMantineTheme } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import ShellHeader from "./components/shell/ShellHeader";
import ShellNavbar from "./components/shell/ShellNavbar";

import "./css/greycliff.css";

function Layout() {
	const [navOpened, setNavOpened] = useState(false);

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
					navbar={<ShellNavbar opened={navOpened} setOpened={setNavOpened} />}
					header={<ShellHeader opened={navOpened} setOpened={setNavOpened} />}
					style={{ backgroundColor: "white", marginBottom: 50 }}
					navbarOffsetBreakpoint="sm"
					padding={0}
        >
          <Outlet />
        </AppShell>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default Layout;
