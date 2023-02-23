import { Button, Group, Header, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";
import { logOut, pb } from "../../lib/pocketbase";

export const HEADER_HEIGHT = 40;

function ShellHeader() {
	const theme = useMantineTheme();
	return (
		<Header height={HEADER_HEIGHT} style={{ backgroundColor: theme.fn.darken(theme.colors.blue[9], 0.5) }}>
			<Group position="right" px="xs" style={{ height: "100%" }}>
				{pb.authStore.model
					? <Button compact variant="white" onClick={logOut} >Admin logout</Button>
					: <Button compact variant="white" component={Link} to="/login">Admin login</Button>
				}
			</Group>
		</Header>
	);
}

export default ShellHeader;