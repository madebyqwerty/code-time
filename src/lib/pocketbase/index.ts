import { goto, invalidateAll } from '$app/navigation';
import PocketBase, { Admin, Record } from 'pocketbase';
import { writable } from 'svelte/store';

const pocketBaseURL = import.meta.env.DEV ? 'http://localhost' : '/';
export const pb = new PocketBase(pocketBaseURL);

export const currentUser = writable<Record | Admin>(pb.authStore.model!);
export const isLoggedIn = writable<boolean>(pb.authStore.model !== null);

pb.authStore.onChange(async () => {
	if (pb.authStore.model !== null) {
		currentUser.set(pb.authStore.model!);
		isLoggedIn.set(true);
	} else {
		await goto('/');
		isLoggedIn.set(false);
	}
});
