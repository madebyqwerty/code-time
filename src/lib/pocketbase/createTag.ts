import type { Language } from '$lib/utils/languages';
import type { HasExpressionInitializer } from 'typescript';
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
export async function createTag(
	name: string,
    color: string,
    description: string,
    userId: string
) {
	const data = {
		"name": name,
        "color": color,
        "description": description,
        "user": userId
	};

	const tag = await pb.collection('tags').create(data, { "$autoCancel": false });
    return tag;
}
