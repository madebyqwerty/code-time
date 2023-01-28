import { writable } from 'svelte/store';
import { pb } from '.';
import type { TagsResponse } from './types';

export const unfilteredTagStore = writable<TagsResponse[]>([]);

export async function populateUnfilteredTagStore(searchTerm:string="") {
	const tagy = await pb.collection('tags').getList<TagsResponse>(1, 1000,{
		filter: `name ~ "${searchTerm}"`,
		$autoCancel: false
	});

	unfilteredTagStore.set(tagy);
}
