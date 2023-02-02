import type { RecordsLanguageOptions } from '$lib/pocketbase/types';
import { pb } from '.';

/**
 * Tahle funkce vytváří nový záznam o programování v databázi
 *
 * @param  {Date} date Datum kdy programoval
 * @param  {number} length Délka v minutách jak dlouho programoval
 * @param  {Language[]} language Jazyky ve kterých programoval
 * @param  {number} rating Počet hvězdiček
 * @param  {string} description Popis programování
 * @param  {string[]} tags Tagy
 */
export async function createRecord(
	date: Date,
	length: number,
	language: RecordsLanguageOptions[],
	rating: number,
	description: string,
	tags: string[],
	id: string = pb.authStore.model!.id
) {
	const data = {
		date: date.toISOString(),
		length: length,
		language: language,
		rating: rating,
		description: description,
		tags: tags,
		user_id: id
	};

	await pb.collection('records').create(data, { $autoCancel: false });
}

/**
 * Tahle funkce vytváří nový záznam o programování v databázi
 *
 * @param  {Date} date Datum kdy programoval
 * @param  {number} length Délka v minutách jak dlouho programoval
 * @param  {Language[]} language Jazyky ve kterých programoval
 * @param  {number} rating Počet hvězdiček
 * @param  {string} description Popis programování
 * @param  {string[]} tags Tagy
 */
export async function updateRecord(
	id: string,
	date: Date,
	length: number,
	language: RecordsLanguageOptions[],
	rating: number,
	description: string | undefined,
	tags: string[]
) {
	const data = {
		date: date.toISOString(),
		length: length,
		language: language,
		rating: rating,
		description: description,
		tags: tags
	};

	await pb.collection('records').update(id, data, { $autoCancel: false });
}
