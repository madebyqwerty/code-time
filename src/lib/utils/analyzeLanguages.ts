import { languageStore } from '$lib/pocketbase/languageStore';
import type { RecordsLanguageOptions, RecordsResponse } from '$lib/pocketbase/types';

export function analyzeLanguages(records: RecordsResponse[]) {
	const result: Record<RecordsLanguageOptions, number> = {};

	records.forEach((record) => {
		record.language.forEach((lang) => {
			if (result[lang]) {
				result[lang] += 1;
			} else {
				result[lang] = 1;
			}
		});
	});

	languageStore.set(
		Object.keys(result).sort(
			(a: string, b: string) =>
				result[b as RecordsLanguageOptions] - result[a as RecordsLanguageOptions]
		) as RecordsLanguageOptions[]
	);
}
