import type { RecordsResponse } from '$lib/pocketbase/types';
import type { PageLoad } from './$types';
import { pb } from '$lib/pocketbase';

export const load = (async () => {
	const records = await pb.collection('records').getFullList<RecordsResponse>(200, {
		sort: '-created',
		expand: 'tags'
	});

	console.log(records);

	return { records };
}) satisfies PageLoad;
