import type { PageLoad } from './$types';
import { recordsStore } from '$lib/pocketbase/recordsStore';
import type { RecordsResponse } from '$lib/pocketbase/types';
import { pb } from '$lib/pocketbase';
import { analyzeLanguagesAndTags } from '$lib/utils/analyzeLanguagesAndTags';
import { subtractMonth } from '$lib/utils/subtractMonth';
import { getDateFromString } from '$lib/utils/getDateFromString';
import { populateUserStore, userStore } from '$lib/pocketbase/userStore';
import { get } from 'svelte/store';

function createFilter(arr: Array<string | number> | null, type: string, mode: '&&' | '||' = '&&') {
	let result = '';

	if (arr && arr.length > 0) {
		result += '&&';
		arr.forEach((str, i) => {
			result += `${type} ~ "${str}" ${i + 1 !== arr.length ? mode : ''}`;
		});
	}

	return result;
}

function convertDateToPocketbaseFormat(date: Date | null) {
	if (date) {
		return date.toISOString().replace('T', ' ').replace('Z', '').split('.')[0];
	}
	return null;
}

export const load = (async ({ depends, url }) => {
	depends('home');

	if (!pb.authStore.model) {
		return {
			pathname: url.toString()
		};
	}

	// Get all the records in the given timeframe
	let datePast = convertDateToPocketbaseFormat(getDateFromString(url.searchParams.get('from')));
	let dateEnd = convertDateToPocketbaseFormat(getDateFromString(url.searchParams.get('to')));
	datePast ||= convertDateToPocketbaseFormat(subtractMonth(new Date(), 1));
	dateEnd ||= convertDateToPocketbaseFormat(new Date());

	let filter = `(date >= "${datePast}" && date <= "${dateEnd}")`;

	const langs: string[] | null = JSON.parse(url.searchParams.get('langs') as string);
	const tags: string[] | null = JSON.parse(url.searchParams.get('tags') as string);
	const stars: number[] | null = JSON.parse(url.searchParams.get('stars') as string)?.map(
		(el: number) => el + 1
	);

	filter +=
		createFilter(tags, 'tags') +
		createFilter(langs, 'language') +
		createFilter(stars, 'rating', '||');

	if (pb.authStore.model.is_manager) {
		await populateUserStore();

		let userID = JSON.parse(url.searchParams.get('user_id')!);
		userID ||= 0;

		const users = get(userStore);
		if (users.length > 0) {
			filter += `&& user_id.id = "${users[userID].id}"`;
		} else {
			return { pathname: url.toString() };
		}
	}

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
