import PocketBase, { ClientResponseError } from "pocketbase";

export const PB_URL = "https://whs-blog.pockethost.io"; // "http://127.0.0.1:8090";
export const pb = new PocketBase(PB_URL);

export async function login(
  identity: string,
  password: string
) {
	await pb.collection("users").authWithPassword(identity, password);
	window.location.replace("/"); // On successful login, go to home page
}

export function logOut() {
	pb.authStore.clear();
	window.location.reload();
}
