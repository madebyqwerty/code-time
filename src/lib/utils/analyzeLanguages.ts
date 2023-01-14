import { languageStore } from '$lib/pocketbase/languageStore';
import type { RecordsLanguageOptions, RecordsResponse } from '$lib/pocketbase/types';

export function analyzeLanguages(records: RecordsResponse[]) {
	const result: Record<RecordsLanguageOptions, number> = {
		Java: 0,
		'C++': 0,
		Python: 0,
		JavaScript: 0,
		'C#': 0,
		PHP: 0,
		Ruby: 0,
		Perl: 0,
		Swift: 0,
		Go: 0,
		Kotlin: 0,
		Scala: 0,
		R: 0,
		Bash: 0,
		Rust: 0,
		'Objective-C': 0,
		React: 0,
		Angular: 0,
		Vue: 0,
		Ember: 0,
		Svelte: 0,
		C: 0,
		Cobol: 0,
		Fortran: 0,
		Lisp: 0,
		Pascal: 0,
		SQL: 0,
		TypeScript: 0,
		Elixir: 0,
		Erlang: 0,
		Julia: 0,
		Haskell: 0,
		Clojure: 0,
		OCaml: 0,
		'F#': 0,
		WebAssembly: 0
	};

	records.forEach((record) => {
		record.language.forEach((lang) => {
			result[lang] += 1;
		});
	});

	languageStore.set(
		Object.keys(result).sort(
			(a: string, b: string) =>
				result[b as RecordsLanguageOptions] - result[a as RecordsLanguageOptions]
		) as RecordsLanguageOptions[]
	);
}
