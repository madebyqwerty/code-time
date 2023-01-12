import type { Language } from '$lib/utils/languages';
import { pb } from '.';

/**
 * Tahle funkce vytváří nový tag
 *
 * @param  {string} name Název tagu
 * @param  {string} color Barva tagu (hex)
 * @param  {string} description Popis tagu
 * @param  {string} userId ID uživatele
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
    return tag["id"];
}
