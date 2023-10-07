import type { PageLoad } from './$types';
import { recordsStore } from '$lib/pocketbase/recordsStore';
import type { RecordsResponse } from '$lib/pocketbase/types';
import { pb } from '$lib/pocketbase';
import { analyzeLanguagesAndTags } from '$lib/utils/analyzeLanguagesAndTags';
import { subtractMonth } from '$lib/utils/subtractMonth';
import { getDateFromString } from '$lib/utils/getDateFromString';
import { populateUserStore, userStore } from '$lib/pocketbase/userStore';
import { get } from 'svelte/store';
import { populateTagStore } from '$lib/pocketbase/tagStore';
import { safePocketbaseCall } from '$lib/fp/taskEitherHelpers';

function createFilter(arr: Array<string | number> | null, type: string, mode: '&&' | '||' = '&&') {
	let result = '';

	if (arr && arr.length > 0) {
		result += ' && (';
		arr.forEach((str, i) => {
			result += `${type} ~ "${str}" ${i + 1 !== arr.length ? mode : ''}`;
		});
		result += ')';
	}

	return result;
}

function convertDateToPocketbaseFormat(date: Date | null) {
	if (date) {
		return date.toISOString().replace('T', ' ').replace('Z', '');
	}
	return null;
}

export const load = (async ({ depends, url }) => {
	depends('home');

	if (!pb.authStore.model) {
		return;
	}
	await populateTagStore();

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

	const fromLen = url.searchParams.get('fromLength');
	const toLen = url.searchParams.get('toLength');

	if (fromLen && toLen) {
		filter += `&& (length >= ${fromLen} && length <= ${toLen})`;
	} else {
		filter += `&& (length >= 0 && length <= 60)`;
	}

	if (pb.authStore.model.is_manager) {
		await populateUserStore();

		let userID = JSON.parse(url.searchParams.get('user_id')!);
		userID ||= 0;

		const users = get(userStore);

		if (users.length > 0) {
			filter += ` && user_id.id = "${users[userID].id}"`;
		} else {
			return;
		}
	}

	console.log(filter);

	const records = await safePocketbaseCall(
		pb.collection('records').getList<RecordsResponse>(1, 200, {
			filter: filter,
			$autoCancel: false
		})
	)();

	console.log(records);

	analyzeLanguagesAndTags(records.items);

	recordsStore.set(
		records.items.map((record) => {
			return {
				...record,
				date: new Date(record.date),
				tags: record.tags ? [record.tags] : ([] as string[])
			};
		})
	);

	return;
}) satisfies PageLoad;
