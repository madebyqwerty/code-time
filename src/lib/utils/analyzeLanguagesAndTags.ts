import { languageStore } from '$lib/pocketbase/languageStore';
import { tagStore } from '$lib/pocketbase/tagStore';
import type { RecordsLanguageOptions, RecordsResponse, TagsResponse } from '$lib/pocketbase/types';

export function analyzeLanguagesAndTags(records: RecordsResponse[]) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const resultLanguages: { [key in RecordsLanguageOptions]: number } = {};
	const resultTags: { [key: string]: number } = {};
	const tags: { [k: string]: TagsResponse } = {};

	records.forEach((record) => {
		record.language.forEach((lang) => {
			if (resultLanguages[lang]) {
				resultLanguages[lang] += 1;
			} else {
				resultLanguages[lang] = 1;
			}
		});

		record.expand?.tags.forEach((tag: TagsResponse) => {
			tags[tag.id] = tag;
			if (resultTags[tag.id]) {
				resultTags[tag.id] += 1;
			} else {
				resultTags[tag.id] = 1;
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

	console.log(tags);
	tagStore.set(tagIDs.map((id) => tags[id]));
}
