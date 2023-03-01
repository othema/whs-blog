import BlogContainer from "../components/BlogContainer";
import { Button, Title, Text, SimpleGrid, Center } from "@mantine/core";
import { pb } from "../lib/pocketbase";
import { IconCirclePlus } from "@tabler/icons";
import NewBlogModal from "../components/modals/NewBlogModal";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Loading from "../components/Loading";

function BlogPage() {
	const [newModalOpen, setNewModalOpen] = useState(false);
	const [blogs, setBlogs] = useState<any>();

	async function fetchBlogs() {
		const req = await pb.collection("posts").getFullList(100, { sort: "-updated", expand: "user" });
		setBlogs(req);
	}

	useEffect(() => {
		fetchBlogs();
	}, []);

	return (
		<BlogContainer title="Blog" contentSize="md" description={(
			<>
				<Text color="dimmed">Opinions on recent events at Woking High School. Speak to me if you want to become a verified blogger.</Text>
				{pb.authStore.model
				? <Button mt="sm" leftIcon={<IconCirclePlus size={17} stroke={2.2} />} onClick={() => setNewModalOpen(true)}>New blog post</Button>
				: <></>
			}
			</>
		)}>
			<NewBlogModal opened={newModalOpen} onClose={() => setNewModalOpen(false)} />
			
			<Title order={2} mb="lg">Recent blog posts</Title>
			{!blogs
				? <Loading />
				: (
					<Center>
						<SimpleGrid cols={3} breakpoints={[
							{ maxWidth: "lg", cols: 2 },
							{ maxWidth: "md", cols: 1 }
						]}>
							{blogs?.map((blog: any) => (
								<BlogCard blog={blog} />
							))}
						</SimpleGrid>
					</Center>
			)}
		</BlogContainer>
	);
}

export default BlogPage;