import type { RecordsResponse } from '$lib/pocketbase/types';
import type { PageLoad } from './$types';
import { pb } from '$lib/pocketbase';

export const load = (async () => {
	let records = await pb.collection('records').getFullList<RecordsResponse>(200, {
		sort: '-created',
		expand: 'tags'
	});

	console.log(records);

	records = records.map((r) => {
		return {
			...r,
			date: new Date(r.date).toLocaleDateString('cs'),
			expand: {
				tags: r.expand?.tags ? r.expand.tags : []
			}
		};
	});

	return { records };
}) satisfies PageLoad;
