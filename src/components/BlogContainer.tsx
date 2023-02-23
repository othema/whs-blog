import { Container, Title, Divider, Text, useMantineTheme, MantineNumberSize, Stack, Skeleton } from "@mantine/core";
import { ReactNode, useRef } from "react";

export interface IBlogContainerProps {
	title: string;
	description?: ReactNode;
	children: ReactNode;
	titleSize?: MantineNumberSize;
}

function BlogContainer({ title, description = "", children, titleSize = 45 }: IBlogContainerProps) {
	const theme = useMantineTheme();
	const width = theme.breakpoints.sm;
	console.log(title);
	return (
    <>
      <div
        style={{
          height: 300,
          display: "flex",
          alignItems: "center",
          position: "fixed",
          left: 0,
          right: 0,
					marginLeft: 300,
					backgroundColor: theme.colors.gray[1],
          boxShadow:
            "inset rgba(0, 0, 0, 0.05) 0px 1px 0px, inset rgba(0, 0, 0, 0.05) 0px 0px 23px -7px, inset rgba(0, 0, 0, 0.04) 0px 0px 12px -7px",
        }}
      >
				<Container style={{ width: width }}>
					<Skeleton visible={title === ""} height={32} mb="xl">
						<Title order={1} size={titleSize}>
							{title}
						</Title>
					</Skeleton>
          {description}
        </Container>
      </div>
      <div
        style={{
          width: "100%",
          marginTop: 300,
          paddingTop: theme.spacing.xl,
					backgroundColor: "white",
					position: "relative"
        }}
      >
        <Container size={width} p={0}>
          {children}
        </Container>
      </div>
    </>
  );
}

export default BlogContainer;