import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pb } from "../lib/pocketbase";
import BlogContainer from "../components/BlogContainer";
import relativeDate from "../lib/relativeDate";
import { Button, Skeleton, Switch, Text, TextInput, useMantineTheme } from "@mantine/core";
import { hideNotification, showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconClock, IconPhoto, IconUser } from "@tabler/icons";

import { RichTextEditor, Link as TiptapLink, useRichTextEditorContext } from "@mantine/tiptap";
import { BubbleMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { HEADER_HEIGHT } from "../components/shell/ShellHeader";
import Loading from "../components/Loading";

function SaveBlogControl({ callback }: { callback: () => void }) {
	const { editor } = useRichTextEditorContext();
	const theme = useMantineTheme();
	const { blog } = useParams();

	return (
		<RichTextEditor.Control
			onClick={callback}
			aria-label="Save blog post"
			title="Save blog post"
			color="green"
			style={{ backgroundColor: theme.colors.green[0] }}
		>
			<IconCheck size={16} color="green" />
		</RichTextEditor.Control>
	)
}

function InsertImageControl() {
	const { editor } = useRichTextEditorContext();

	function insertImage() {
		const url = prompt("Image URL");
		if (!url) return;
		editor.commands.setImage({ src: url });
	}

	return (
		<RichTextEditor.Control
			onClick={insertImage}
			aria-label="Insert image from URL"
			title="Insert image from URL"
		>
			<IconPhoto size={16} />
		</RichTextEditor.Control>
	)
}

function ViewBlogPage() {
	const { blog } = useParams();
	const [data, setData] = useState<any>();
	const theme = useMantineTheme();

	const [blogTitle, setBlogTitle] = useState("");
	const [coverImage, setCoverImage] = useState("");
	const [isPublic, setPublic] = useState(false);

	const editor = useEditor({
    extensions: [StarterKit, TiptapLink, Superscript, Subscript, Underline, Highlight, Image],
    content: "",
		editable: pb.authStore.model !== null,
	});

	async function saveBlogPost() {
		if (!blog || !data) return;
		showNotification({
			title: "Saving",
			message: "Your blog post is being saved",
			loading: true,
			id: "load-save",
			autoClose: false
		});
		await pb.collection("posts").update(blog, {
			content: editor?.getHTML(),
			title: blogTitle,
			cover: coverImage,
			public: isPublic
		});
		updateNotification({
			id: "load-save",
			title: "Saved!",
			message: "Your blog post was saved.",
			icon: <IconCheck />,
			loading: false,
			color: "green",
			autoClose: 5000
		});
	}
	
	useEffect(() => {
		(async () => {
			if (!blog) return;
			const req = await pb.collection("posts").getOne(blog, { expand: "user", $autoCancel: false });

			setData(req);
			setBlogTitle(req.title);
			setCoverImage(req.cover);
			setPublic(req.public)
		})();
	}, [blog]);

	useEffect(() => {
		editor?.commands.setContent(data?.content);
	}, [editor, data])

	return (
    <BlogContainer
      title={blogTitle}
			description={<>
				<Skeleton visible={!data} width={200}>
					<Text color="dimmed"><IconUser size={14} /> {`By ${data?.expand?.user?.name}`}</Text>
				</Skeleton>
				<Skeleton mt={!data ? 7 : 0} visible={!data} width={180}>
					<Text color="dimmed"><IconClock size={14} /> {relativeDate(data?.created)}</Text>
				</Skeleton>

				{pb.authStore.model
					? (
						<form style={{ maxWidth: 400, marginTop: theme.spacing.md }}>
							<TextInput label="Blog title" placeholder="Your new blog title" value={blogTitle} onChange={(e) => setBlogTitle(e.currentTarget.value)} />
							<TextInput label="Cover image URL" placeholder="https://images.com/your-image" value={coverImage} onChange={(e) => setCoverImage(e.currentTarget.value)} />
							<Switch label="Public" mt="xs" checked={isPublic} onChange={(e) => setPublic(e.currentTarget.checked)} />
							<Button mt="sm" onClick={saveBlogPost}>Save</Button>
						</form>
					) : <></>
				}
			</>}
		>
			{!data
				? <Loading />
				: (
					<RichTextEditor
						editor={editor}
						mt={-10}
						style={{ border: pb.authStore.model ? "" : "none" }}
						sx={{ img: { borderRadius: theme.radius.sm } }}
					>
						{pb.authStore.model
							? (
								<>
									<RichTextEditor.Toolbar sticky stickyOffset={HEADER_HEIGHT}>
										<RichTextEditor.ControlsGroup>
											<RichTextEditor.Bold />
											<RichTextEditor.Italic />
											<RichTextEditor.Underline />
											<RichTextEditor.Strikethrough />
											<RichTextEditor.ClearFormatting />
											<RichTextEditor.Highlight />
											<RichTextEditor.Code />
										</RichTextEditor.ControlsGroup>

										<RichTextEditor.ControlsGroup>
											<RichTextEditor.H1 />
											<RichTextEditor.H2 />
											<RichTextEditor.H3 />
											<RichTextEditor.H4 />
										</RichTextEditor.ControlsGroup>

										<RichTextEditor.ControlsGroup>
											<RichTextEditor.Blockquote />
											<RichTextEditor.Hr />
											<RichTextEditor.BulletList />
											<RichTextEditor.OrderedList />
											<RichTextEditor.Subscript />
											<RichTextEditor.Superscript />
										</RichTextEditor.ControlsGroup>

										<RichTextEditor.ControlsGroup>
											<RichTextEditor.Link />
											<RichTextEditor.Unlink />
										</RichTextEditor.ControlsGroup>
										
										<InsertImageControl />
										<SaveBlogControl callback={saveBlogPost} />
									</RichTextEditor.Toolbar>
									{editor && (
										<BubbleMenu editor={editor}>
											<RichTextEditor.ControlsGroup>
												<RichTextEditor.Bold />
												<RichTextEditor.Italic />
												<RichTextEditor.Link />
											</RichTextEditor.ControlsGroup>
										</BubbleMenu>
									)}
									<RichTextEditor.Content />
								</>
							) : <RichTextEditor.Content />
						}

					</RichTextEditor>
				)}
    </BlogContainer>
  );
}

export default ViewBlogPage;