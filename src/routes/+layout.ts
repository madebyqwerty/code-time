export const ssr = false;
export const prerender = true;

import type { LayoutLoad } from './$types';
import { populateTagStore } from '$lib/pocketbase/tagStore';

export const load = (async (depends) => {
	await populateTagStore();

	return {};
}) satisfies LayoutLoad;
