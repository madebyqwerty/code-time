import { goto, invalidate } from '$app/navigation';
import PocketBase, { Admin, Record } from 'pocketbase';
import { writable } from 'svelte/store';

const pocketBaseURL = import.meta.env.DEV
	? 'http://localhost'
	: 'http://public-a4ced53e5ce70b738f88b70113bc806d.tourdeapp.cz/';
export const pb = new PocketBase(pocketBaseURL);

export const currentUser = writable<Record | Admin>(pb.authStore.model!);
export const isLoggedIn = writable<boolean>(pb.authStore.model !== null);

pb.authStore.onChange(async () => {
	if (pb.authStore.model !== null) {
		currentUser.set(pb.authStore.model!);
		isLoggedIn.set(true);
		console.log('login');
		await invalidate('home');
	} else {
		await goto('/');
		isLoggedIn.set(false);
	}
});

export async function login(email: string, password: string) {
	await pb
		.collection('users')
		.authWithPassword(email, password, { $autoCancel: false })
		.catch(() => {
			throw new Error('Něco se pokazilo, ujistěte se že máte správně e-mail a správné heslo');
		});
}
