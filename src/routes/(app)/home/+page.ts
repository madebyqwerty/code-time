import type { PageLoad } from './$types';
import { recordsStore } from '$lib/pocketbase/recordsStore';
import type { RecordsResponse } from '$lib/pocketbase/types';
import { pb } from '$lib/pocketbase';
import { analyzeLanguagesAndTags } from '$lib/utils/analyzeLanguagesAndTags';
import { subtractMonth } from '$lib/utils/subtractMonth';
import { getDateFromString } from '$lib/utils/getDateFromString';

function createFilter(arr: Array<string> | null, type: string) {
	let result = '';

	if (arr && arr.length > 0) {
		result += '&&';
		arr.forEach((str, i) => {
			result += `${type} ~ "${str}" ${i + 1 !== arr.length ? '&&' : ''}`;
		});
	}

	return result;
}

export const load = (async ({ depends, url }) => {
	depends('home');

	// Get all the records in the given timeframe
	let datePast = getDateFromString(url.searchParams.get('from'));
	let dateEnd = getDateFromString(url.searchParams.get('to'));
	datePast ||= subtractMonth(new Date(), 1);
	dateEnd ||= new Date();

	const start = datePast.toISOString().replace('T', ' ').replace('Z', '').split('.')[0];
	const end = dateEnd.toISOString().replace('T', ' ').replace('Z', '').split('.')[0];

	let filter = `(date >= "${start}" && date <= "${end}")`;

	const langs: string[] | null = JSON.parse(url.searchParams.get('langs') as string);
	const tags: string[] | null = JSON.parse(url.searchParams.get('tags') as string);

	filter += createFilter(tags, 'tags') + createFilter(langs, 'language');

	console.log(filter);

	const records = await pb.collection('records').getList<RecordsResponse>(1, 50, {
		filter: filter,
		expand: 'tags',
		$autoCancel: false
	});

	analyzeLanguagesAndTags(records.items);

	recordsStore.set(
		records.items.map((r) => {
			return {
				...r,
				date: new Date(r.date),
				expand: {
					tags: r.expand?.tags ? r.expand.tags : []
				}
			};
		})
	);

	return {
		pathname: url.toString()
	};
}) satisfies PageLoad;
