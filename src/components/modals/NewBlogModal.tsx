import { Button, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { pb } from "../../lib/pocketbase";

export interface INewBlogModalProps {
	opened: boolean;
	onClose: () => void;
}

interface NewBlogFormValues {
	title: string;
}

function NewBlogModal({ opened, onClose }: INewBlogModalProps) {
	const navigate = useNavigate();

	const form = useForm<NewBlogFormValues>({
		initialValues: {
			title: ""
		}
	});

	async function postForm(values: NewBlogFormValues) {
		const newPost = await pb.collection("posts").create({
			content: "<b>Hello</b>",
			title: values.title,
			user: pb.authStore.model?.id
		});
		navigate("/blog/" + newPost.id);
	}

	return (
		<Modal title="New blog post" styles={{ title: { fontWeight: "bold" }}} opened={opened} onClose={onClose} exitTransitionDuration={300}>
			<form onSubmit={form.onSubmit((values: NewBlogFormValues) => postForm(values))}>
				<TextInput label="Blog title" placeholder="New blog title" required {...form.getInputProps("title")} />

				<Button type="submit" fullWidth mt="md">Create</Button>
			</form>
		</Modal>
	);
}

export default NewBlogModal;