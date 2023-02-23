import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pb } from "../lib/pocketbase";
import BlogContainer from "../components/BlogContainer";
import relativeDate from "../lib/relativeDate";
import { Skeleton, Text, TextInput, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconClock, IconPhoto, IconUser } from "@tabler/icons";

import { RichTextEditor, Link as TiptapLink, useRichTextEditorContext } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { HEADER_HEIGHT } from "../components/shell/ShellHeader";
import Loading from "../components/Loading";

function SaveBlogControl({ blogTitle, blogCover }: { blogTitle: string, blogCover: string }) {
	const { editor } = useRichTextEditorContext();
	const theme = useMantineTheme();
	const { blog } = useParams();

	async function saveBlogPost() {
		if (!blog) return;
		await pb.collection("posts").update(blog, {
			content: editor.getHTML(),
			title: blogTitle,
			cover: blogCover
		});
		showNotification({
			title: "Saved!",
			message: "Your blog post was saved.",
			color: "green",
			icon: <IconCheck />
		});
	}

	return (
		<RichTextEditor.Control
			onClick={saveBlogPost}
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

	const editor = useEditor({
    extensions: [StarterKit, TiptapLink, Superscript, Subscript, Underline, Highlight, Image],
    content: "",
    editable: pb.authStore.model !== null,
	});
	
	useEffect(() => {
		(async () => {
			if (!blog) return;
			const req = await pb.collection("posts").getOne(blog, { expand: "user" });

			setData(req);
			setBlogTitle(req.title);
			setCoverImage(req.cover);
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
										<SaveBlogControl blogTitle={blogTitle} blogCover={coverImage} />
									</RichTextEditor.Toolbar>
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