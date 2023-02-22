import { Paper, Title, Container, TextInput, Button, Divider } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { IconLock, IconUser } from "@tabler/icons";
import { pb, login } from "../lib/pocketbase";

interface LoginFormValues {
	username: string;
	password: string;
}

function LoginPage() {
	const form = useForm<LoginFormValues>({
		initialValues: {
			username: "",
			password: ""
		}
	});

	async function postForm(values: LoginFormValues) {
		await login(values.username, values.password);
	}

	return (
		<Container size={350}>
			<Paper withBorder p="md" radius="md" mt={100}>
				<form onSubmit={form.onSubmit((values) => postForm(values))}>
					<Title ta="center" mb="sm">Login</Title>
					<TextInput label="Username or email" placeholder="Admin username or email" icon={<IconUser size={14} />} {...form.getInputProps("username")} required/>
					<TextInput mt="xs" label="Password" placeholder="Admin password" type="password" icon={<IconLock size={14} />} {...form.getInputProps("password")} required />

					<Button mt="md" type="submit" fullWidth>Login</Button>
				</form>
			</Paper>
		</Container>
	);
}

export default LoginPage;