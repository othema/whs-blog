import { Card, Image, Text, Group, Avatar, createStyles } from "@mantine/core";
import { Link } from "react-router-dom";
import { avatarUrl } from "../lib/pocketbase";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
		width: 300,
		height: 395
  },

  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },

  footer: {
		position: "absolute",
		bottom: theme.spacing.md
  },
}));

interface BlogCardProps {
	blog: any;
}

function BlogCard({ className, blog }: BlogCardProps &
  Omit<React.ComponentPropsWithoutRef<"div">, keyof BlogCardProps>) {
  const { classes, cx, theme } = useStyles();
  const linkProps = {
    to: "/blog/" + blog.id,
  };

  return (
    <Card
      withBorder
      radius="md"
      className={cx(classes.card, className)}
    >
      <Card.Section>
        <Link {...linkProps}>
          <Image src={blog.cover} height={180} />
        </Link>
      </Card.Section>

      <Text className={classes.title} weight={500} component={Link} {...linkProps}>
        {blog.title}
      </Text>

			<Text size="sm" color="dimmed" lineClamp={4}>
				{blog.content.replace(/<[^>]*>/g, "")}
      </Text>

      <Group spacing={0} className={classes.footer}>
				<Avatar src={avatarUrl(blog.expand.user)} size={24} radius="xl" mr="xs" />
				<Text size="sm" inline>
					{blog.expand.user.name}
				</Text>
			</Group>
    </Card>
  );
}

export default BlogCard;