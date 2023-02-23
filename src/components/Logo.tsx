import { Image, Text, Stack } from "@mantine/core";
import logo from "../assets/img/logo-new.jpg";

export default function Logo() {
  return (
    <Stack spacing="sm" align="center">
      <Image src={logo} alt="School logo" width={90} />
      <Text size={26} weight="bolder" sx={{ lineHeight: 1 }} align="center">
        Woking High
        <br />
        School Blog
      </Text>
      <Text ta="center">An unofficial blog site made by a student, for students.</Text>
    </Stack>
  );
}
