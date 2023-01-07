import PocketBase from 'pocketbase';
/**
 * Tahle funkce vytváří nový záznam o programování v databázi
 *
 * @param  {Date} date Datum kdy programoval
 * @param  {number} length Délka v minutách jak dlouho programoval
 * @param  {string[]} language Jazyky ve kterých programoval
 * @param  {number} rating Počet hvězdiček
 * @param  {string} description Popis programování
 * @param  {string[]} tags Tagy
 */
export async function createRecord(
	date: Date,
	length: number,
	language: string[],
	rating: number,
	description: string,
	tags: string[]
) {
	// TODO: Implementovat tuhle funkci
	console.log('Test');
}
