import { Button, Group, Header } from "@mantine/core";
import { Link } from "react-router-dom";
import { logOut, pb } from "../../lib/pocketbase";

export const HEADER_HEIGHT = 40;

function ShellHeader () {
	return (
		<Header height={HEADER_HEIGHT}>
			<Group position="right" px="xs" style={{ height: "100%" }}>
				{pb.authStore.model
					? <Button compact variant="filled" onClick={logOut}>Admin logout</Button>
					: <Button compact variant="subtle" component={Link} to="/login">Admin login</Button>
				}
			</Group>
		</Header>
	);
}

export default ShellHeader;