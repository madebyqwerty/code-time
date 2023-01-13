import type { Language } from '$lib/utils/languages';
import { faker } from '@faker-js/faker/locale/cz';
import { pb, createRecord, login } from '../.';
import { createUser } from './createUser';
import { createTag } from '../createTag';

const jazyky: Language[] = [
	'Java',
	'C++',
	'Python',
	'JavaScript',
	'C#',
	'PHP',
	'Ruby',
	'Perl',
	'Swift',
	'Go',
	'Kotlin',
	'Scala',
	'R',
	'Bash',
	'Rust',
	'Objective-C',
	'React',
	'Angular',
	'Vue',
	'Ember',
	'Svelte',
	'C',
	'Cobol',
	'Fortran',
	'Lisp',
	'Pascal',
	'SQL',
	'TypeScript',
	'Elixir',
	'Erlang',
	'Julia',
	'Haskell',
	'Clojure',
	'OCaml',
	'F#',
	'WebAssembly'
];

function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

/**
 *
 * Tahle funkce zaplní databázi
 * @param  {number} users Počet uživatelů
 * @param  {number} tags Počet tagů
 */
export async function populateDatabase(users: number, tags: number) {
	for (let i = 0; i < users + 1; i++) {
		const email = faker.internet.email();
		const password = faker.internet.password();

		// Aby se zaplnil i teď přihlášený uživatel
		if (i !== 0) {
			await createUser(email, password, faker.name.fullName());
			await login(email, password);
		}

		// Pro každý tag
		for (let y = 0; y < tags; y++) {
			const tag = await createTag(
				faker.lorem.word({ length: { max: 20, min: 8 } }),
				faker.color.rgb({ format: 'hex', casing: 'lower' }),
				faker.lorem.words(5)
			);

			const records = Math.floor(Math.random() * 5) + 1; //random číslo 1-5
			const random = () => Math.floor(Math.random() * jazyky.length);
			// Pro každý tag vygenerujeme náhodný počet záznámů
			for (let z = 0; z < records; z++) {
				const hodnoceni = Math.floor(Math.random() * 5) + 1;
				let langs = Array(random());
				langs = jazyky.map((el) => jazyky[Math.floor(Math.random() * jazyky.length)]);

				await createRecord(
					faker.date.past(),
					parseInt(faker.random.numeric(2)),
					langs.filter(onlyUnique),
					hodnoceni,
					faker.lorem.words(10),
					[tag]
				);
			}
		}
	}
	pb.authStore.clear();
}
