import { languageStore } from '$lib/pocketbase/languageStore';
import type { RecordsLanguageOptions, RecordsResponse } from '$lib/pocketbase/types';

export function analyzeLanguagesAndTags(records: RecordsResponse[]) {
	if (!records) {
		return;
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const resultLanguages: { [key in RecordsLanguageOptions]: number } = {};

	records.forEach((record) => {
		record.language.forEach((lang) => {
			if (resultLanguages[lang]) {
				resultLanguages[lang] += 1;
			} else {
				resultLanguages[lang] = 1;
			}
		});
	});

	languageStore.set(
		Object.keys(resultLanguages).sort(
			(a: string, b: string) =>
				resultLanguages[b as RecordsLanguageOptions] - resultLanguages[a as RecordsLanguageOptions]
		) as RecordsLanguageOptions[]
	);
}
