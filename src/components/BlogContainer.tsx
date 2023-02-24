import { Container, Title, Divider, Text, useMantineTheme, MantineNumberSize, Stack, Skeleton, MantineSize } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode, useRef } from "react";

export interface IBlogContainerProps {
	title: string;
	description?: ReactNode;
	children: ReactNode;
	contentSize?: MantineSize | null;
}

function BlogContainer({ title, description = "", children, contentSize = null }: IBlogContainerProps) {
	const theme = useMantineTheme();
	const mobileScreen = useMediaQuery(`(min-width: ${theme.breakpoints.sm}px)`);
	const titleContainer = useRef<HTMLDivElement>(null);
	const titleRef = useRef(null);

	let containerWidth;

	if (!contentSize)
		containerWidth = theme.breakpoints.sm;
	else
		containerWidth = theme.breakpoints[contentSize];

	return (
    <>
			<div
				ref={titleContainer}
        style={{
					minHeight: 300,
          display: "flex",
          alignItems: "center",
          position: "fixed",
          left: mobileScreen ? 300 : 0,
          right: 0,
					backgroundColor: theme.colors.gray[1],
          boxShadow:
            "inset rgba(0, 0, 0, 0.05) 0px 1px 0px, inset rgba(0, 0, 0, 0.05) 0px 0px 23px -7px, inset rgba(0, 0, 0, 0.04) 0px 0px 12px -7px",
        }}
			>
				<Container style={{ width: containerWidth }} py="xl">
					<Skeleton visible={title === ""} height={title ? "auto" : 45} mb={title ? 3 : 12}>
						<Title order={1} size={45} style={{ lineHeight: 1 }} ref={titleRef}>
							{title}
						</Title>
					</Skeleton>
          {description}
        </Container>
      </div>
      <div
        style={{
          width: "100%",
          marginTop: titleContainer?.current?.offsetHeight,
          paddingTop: theme.spacing.xl,
					backgroundColor: "white",
					position: "relative"
        }}
      >
        <Container size={containerWidth}>
          {children}
        </Container>
      </div>
    </>
  );
}

export default BlogContainer;