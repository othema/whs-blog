import { Divider, Navbar, NavLink } from "@mantine/core";
import { IconArticle, IconChevronRight, IconHome, IconInfoCircle, IconNotebook, IconShare } from "@tabler/icons";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Logo";

function ShellNavbar() {
	const location = useLocation();

	return (
    <Navbar width={{ base: 300 }} p="sm">
      <Logo />
			<Divider my="md" />
			
      <NavLink
        label="Blog"
        description="My opinions on recent events"
        icon={<IconArticle size={16} />}
        component={Link}
        to="/blog"
        active={location.pathname.startsWith("/blog")}
      />
      <NavLink
        label="Study content"
        description="View all revision material in one place"
        icon={<IconNotebook size={16} />}
        component={Link}
        to="/study"
        active={location.pathname.startsWith("/study")}
      />
      <NavLink
        label="Links"
        description="Where you can find us elsewhere"
        icon={<IconShare size={16} />}
        rightSection={<IconChevronRight size={12} stroke={1.5} />}
      ></NavLink>
    </Navbar>
  );
}

export default ShellNavbar;