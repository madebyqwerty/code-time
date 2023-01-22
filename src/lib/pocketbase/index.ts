import { invalidateAll } from '$app/navigation';
import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase('http://0.0.0.0:80');

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange(async () => {
	currentUser.set(pb.authStore.model);
});

export async function login(email: string, password: string) {
	console.log('login');
	await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
	await invalidateAll();
}

export { createRecord } from './createRecord';
