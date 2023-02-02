import { tagStore } from '$lib/pocketbase/tagStore';
import type { TagsResponse } from '../pocketbase/types';
import { get } from 'svelte/store';

export const getTagFromID = (id: string) => {
	const tags = get<TagsResponse[]>(tagStore);
	return tags.filter((taglmao: { id: string }) => taglmao.id == id)[0];
};
