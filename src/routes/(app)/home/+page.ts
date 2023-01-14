import type { PageLoad } from './$types';
import { recordsStore } from '$lib/pocketbase/recordsStore';
import type { RecordsResponse } from '$lib/pocketbase/types';
import { pb } from '$lib/pocketbase';
import { analyzeLanguages } from '$lib/utils/analyzeLanguages';

const subtractMonth = (date: Date, months: number) => {
	date.setMonth(date.getMonth() - months);
	return date;
};

export const load = (async ({ depends, url }) => {
	depends('home');

	// Get all the records in the given timeframe
	const defaultPast = subtractMonth(new Date(), 1);
	const defaultDate = new Date();

	const from = url.searchParams.get('from');
	const to = url.searchParams.get('to');

	const datePast = from ? new Date(from) : defaultPast;
	const dateEnd = to ? new Date(to) : defaultDate;

	const start = datePast.toISOString().replace('T', ' ').replace('Z', '').split('.')[0];
	const end = dateEnd.toISOString().replace('T', ' ').replace('Z', '').split('.')[0];

	let filter = `(date >= "${start}" && date <= "${end}")`;

	const langs: string[] | null = JSON.parse(url.searchParams.get('langs') as string);
	const tags: string[] | null = JSON.parse(url.searchParams.get('tags') as string);

	filter =
		(tags && tags.length > 0) || (langs && langs.length > 0) ? filter.concat(' && (') : filter;

	if (tags && tags.length > 0) {
		console.log(tags);
		tags.forEach((tag, i) => {
			filter = filter.concat(`tags ~ "${tag}" ${i + 1 !== tags.length ? '&&' : ''}`);
		});
	}

	if (langs && langs.length > 0) {
		filter = tags && tags.length > 0 ? filter.concat('&&') : filter;
		langs.forEach((lang, i) => {
			filter = filter.concat(`language ~ "${lang}" ${i + 1 !== langs.length ? '&&' : ''}`);
		});
	}

	// Přidá nakonec závorku aby to byl validní filtr
	filter = (tags && tags.length > 0) || (langs && langs.length > 0) ? filter.concat(')') : filter;

	const records = await pb.collection('records').getList<RecordsResponse>(1, 50, {
		filter: filter,
		expand: 'tags',
		$autoCancel: false
	});

	analyzeLanguages(records.items);

	recordsStore.set(
		records.items.map((r) => {
			return {
				...r,
				date: new Date(r.date).toLocaleDateString('cs'),
				expand: {
					tags: r.expand?.tags ? r.expand.tags : []
				}
			};
		})
	);
	return {};
}) satisfies PageLoad;