<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Textarea from '$lib/components/forms/Textarea.svelte';
	import Range from '$lib/components/forms/Range.svelte';
	import Button from '$lib/components/Button.svelte';
	import { updateRecord } from '$lib/pocketbase/createRecord';
	import Multiselect from '$lib/components/forms/Multiselect.svelte';
	import { languageIDs, languageNames } from '$lib/utils/languages';
	import { tagStore } from '$lib/pocketbase/tagStore';
	import Label from '$lib/components/forms/Label.svelte';
	import './Sidenav/datepicker.css';
	import Number from '$lib/components/forms/Number.svelte';
	import Datepicker from '$lib/components/forms/Datepicker.svelte';
	import { invalidate } from '$app/navigation';
	import type { Records } from '$lib/pocketbase/recordsStore';
	import { onMount } from 'svelte';
	import { getTagFromID } from '$lib/utils/getTagFromID';
	import type { RecordsLanguageOptions } from '$lib/pocketbase/types';

	export let open = false;
	export let record: Records;

	let languages = record.language.map(
		(lang) => languageNames[lang]
	) as unknown as RecordsLanguageOptions[];
	let tags = record.tags.map((tag) => getTagFromID(tag).name);

	function updateRecordWrapper() {
		updateRecord(
			record.id,
			record.date,
			record.length,
			languages.map<RecordsLanguageOptions>((lang) => languageIDs[lang] as RecordsLanguageOptions),
			record.rating,
			record.description,
			tags.map((tag) => $tagStore[$tagStore.map((tag2) => tag2.name).indexOf(tag)].id)
		);

		open = false;
		invalidate('home');
	}
</script>

<Sidebar bind:open title="Upravit záznam">
	<div class="wrapper">
		<div class="diffuculty">
			<div class="label-wrapper"><Label>Obtížnost</Label></div>
			<Range bind:value={record.rating} />
		</div>
		<div class="multiselect-wrapper">
			<Label>Programovací jazyky</Label>
			<Multiselect
				placeholder="Vybrat jazyk"
				bind:selected={languages}
				options={Object.values(languageNames)} />
		</div>
		<div class="multiselect-wrapper">
			<Label>Štítky</Label>
			<Multiselect
				placeholder="Vybrat štítky"
				bind:selected={tags}
				options={$tagStore.map((tag) => tag.name)} />
		</div>
		<div class="description">
			<Textarea
				bind:value={record.description}
				placeholder="Naučil jsem se používat print() v Pythonu"
				label="Popis" />
		</div>

		<div class="datetime">
			<div class="date">
				<Label>Datum</Label>
				<Datepicker bind:value={record.date} />
			</div>
			<div class="time">
				<Number label="Délka tréninku" id="training" step={5} bind:value={record.length} />
			</div>
		</div>

		<Button on:click={updateRecordWrapper}>Upravit záznam</Button>
	</div>
</Sidebar>

<style lang="scss">
	.wrapper {
		margin-bottom: 0.8rem;
		display: flex;
		flex-direction: column;
		gap: 2.4rem;
	}

	.label-wrapper {
		margin-bottom: -1.6rem;
	}

	.datetime {
		display: flex;
		gap: 1.6rem;
		& > * {
			width: 100%;
		}
	}
</style>
