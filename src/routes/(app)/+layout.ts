import type { LayoutLoad } from './$types';
import { populateTagStore } from '$lib/pocketbase/tagStore';

export const load = (async () => {
	await populateTagStore();

	return {};
}) satisfies LayoutLoad;
