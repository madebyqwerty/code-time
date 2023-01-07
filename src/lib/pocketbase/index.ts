import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

export const pb = new PocketBase('http://127.0.0.1:8090');

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange(() => {
	currentUser.set(pb.authStore.model);
});

export async function login(email: string, password: string) {
	console.log('login');
	await pb.collection('users').authWithPassword(email, password);
	goto('/home');
}

export { createRecord } from './createRecord';
