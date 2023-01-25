import { writable } from 'svelte/store';
import { pb } from '.';
import type { UsersResponse } from './types';

export const userStore = writable<UsersResponse[]>([]);

export async function populateUserStore() {
	const users = await pb.collection('users').getFullList<UsersResponse>(1000, {
		filter: `manager.id = "${pb.authStore.model!.id}"`
	});

	console.log({ users });

	userStore.set(users);
}
