import { writable } from 'svelte/store';
import { pb } from '.';
import type { TagsResponse } from './types';

export const unfilteredTagStore = writable<TagsResponse[]>([]);

export async function populateTagStore() {
	const tags = await pb.collection('tags').getFullList<TagsResponse>(1000);

	unfilteredTagStore.set(tags);
}
