import { pb } from '.';
import type { TagsResponse } from './types';

function isValidHexColor(color: string): boolean {
	return (
		color.toLowerCase().split('')[0] == '#' &&
		['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'].includes(
			color.toLowerCase().split('')[1]
		) &&
		['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'].includes(
			color.toLowerCase().split('')[2]
		) &&
		['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'].includes(
			color.toLowerCase().split('')[3]
		) &&
		['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'].includes(
			color.toLowerCase().split('')[4]
		) &&
		['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'].includes(
			color.toLowerCase().split('')[5]
		) &&
		['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'].includes(
			color.toLowerCase().split('')[6]
		)
	);
}

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

export async function createTag(name: string, color: string, description:string): Promise<string> {
	if (name.length < 2) {
		throw new Error('Název tagu musí být delší než 2 znaky');
	}

	if (name.length > 30) {
		throw new Error('Název tagu musí být kratší než 30 znaků');
	}

	if (!isValidHexColor(color)) {
		throw new Error('Špatný formát barvy, formát barvy musí být v HEX formátu');
	}

	const pokus = await pb.collection('tags').getList<TagsResponse>(1, 1000, {
		filter: `name="${name}" && user="${pb.authStore.model?.id}"`,
		$autoCancel: false
	});

	if (!(pokus.totalItems === 0)) {
		throw new Error('Tag s tímto názvem již existuje');
	}

	const tag = await pb.collection('tags').create(
		{
			name,
			color,
			description,
			user: pb.authStore.model?.id
		},
		{ $autoCancel: false }
	);
	return tag.id;
}

export async function updateTag(name: string, color: string, description:string, id: string): Promise<void> {
	if (name.length < 2) {
		throw new Error('Název tagu musí být delší než 2 znaky');
	}

	if (name.length > 30) {
		throw new Error('Název tagu musí být kratší než 30 znaků');
	}

	if (!isValidHexColor(color)) {
		throw new Error('Špatný formát barvy, formát barvy musí být v HEX formátu');
	}

	const pokus = await pb.collection('tags').getList<TagsResponse>(1, 1000, {
		filter: `name="${name}" && user="${pb.authStore.model?.id}"`,
		$autoCancel: false
	});

	if (pokus.totalItems === 0 || pokus.items[0].id === id) {
		await pb.collection('tags').update(id, { name, color });
	}
}
