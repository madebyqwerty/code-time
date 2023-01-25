import { pb } from '.';

/**
 * Tahle funkce vytváří nový tag
 *
 * @param  {string} name Název tagu
 * @param  {string} color Barva tagu (hex)
 * @param  {string} description Popis tagu
 * @param  {string} userId ID uživatele
 *
 * @returns {Promise<string>} ID vytvořeného tagu
 */

export async function createTag(name: string, color: string): Promise<string> {
	const tag = await pb.collection('tags').create(
		{
			name,
			color,
			description:"",
			user: pb.authStore.model?.id
		},
		{ $autoCancel: false }
	);
	return tag.id;
}
