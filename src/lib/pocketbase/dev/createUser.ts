import { pb } from '../.';

/**
 * Tahle funkce vytváří nového uživatele
 *
 * @param  {string} email Délka v minutách jak dlouho programoval
 * @param  {string} password Jazyky ve kterých programoval
 * @param  {string} name Počet hvězdiček
 */

export async function createUser(email: string, password: string, name: string) {
	const data = {
		email: email,
		emailVisibility: true,
		password: password,
		passwordConfirm: password,
		name: name
	};

	const user = await pb.collection('users').create(data, { $autoCancel: false });
	return user['id'];
}
