import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { populateTagStore } from './tagStore';

export const pb = new PocketBase('http://127.0.0.1:8090');

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange(() => {
	currentUser.set(pb.authStore.model);
	if (pb.authStore.model) {
		populateTagStore();
		goto('/home');
	}
});

export async function login(email: string, password: string) {
	console.log('login');
	await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
}

export { createRecord } from './createRecord';
