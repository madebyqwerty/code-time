import type { PageLoad } from './$types';
import { getRecordsByDate } from '$lib/pocketbase/getRecordsByDate';

export const load = (async ({ depends, url }) => {
	depends('home');

	const subtractMonth = (date: Date, months: number) => {
		date.setMonth(date.getMonth() - months);
		return date;
	};

	const defaultPast = subtractMonth(new Date(), 1);
	const defaultDate = new Date();

	const from = url.searchParams.get('from');
	const to = url.searchParams.get('to');

	const datePast = from ? new Date(from) : defaultPast;
	const dateEnd = to ? new Date(to) : defaultDate;

	let records = await getRecordsByDate(datePast, dateEnd);

	console.log('records', records);

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
