import { languageStore } from '$lib/pocketbase/languageStore';
import { tagStore } from '$lib/pocketbase/tagStore';
import type { RecordsLanguageOptions, RecordsResponse } from '$lib/pocketbase/types';

export function analyzeLanguagesAndTags(records: RecordsResponse[]) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const resultLanguages: { [key in RecordsLanguageOptions]: number } = {};
	const resultTags: { [key: string]: number } = {};
	const tags = [...records.map((record) => record?.expand?.tags.flat())].flat();

	records.forEach((record) => {
		record.language.forEach((lang) => {
			if (resultLanguages[lang]) {
				resultLanguages[lang] += 1;
			} else {
				resultLanguages[lang] = 1;
			}
		});

		record.expand?.tags.forEach(({ id }: { id: string }) => {
			if (resultTags[id]) {
				resultTags[id] += 1;
			} else {
				resultTags[id] = 1;
			}
		});
	});

	languageStore.set(
		Object.keys(resultLanguages).sort(
			(a: string, b: string) =>
				resultLanguages[b as RecordsLanguageOptions] - resultLanguages[a as RecordsLanguageOptions]
		) as RecordsLanguageOptions[]
	);

	const tagIDs = Object.keys(resultTags).sort(
		(a: string, b: string) => resultTags[b] - resultTags[a]
	);
	tagStore.set(tags.filter((tag) => tagIDs.includes(tag.id)));
}
