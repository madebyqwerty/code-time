<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Textarea from '$lib/components/forms/Textarea.svelte';
	import Range from '$lib/components/forms/Range.svelte';
	import Button from '$lib/components/Button.svelte';
	import { createRecord } from '$lib/pocketbase/createRecord';
	import { currentUser } from '$lib/pocketbase';
	import Multiselect from '$lib/components/forms/Multiselect.svelte';
	import { languageIDs, languageNames } from '$lib/utils/languages';
	import { tagStore } from '$lib/pocketbase/tagStore';
	import { userStore } from '$lib/pocketbase/userStore';
	import ManagerMenu from './manager/ManagerMenu.svelte';
	import Label from '$lib/components/forms/Label.svelte';
	import './Sidenav/datepicker.css';
	import Number from '$lib/components/forms/Number.svelte';
	import Datepicker from '$lib/components/forms/Datepicker.svelte';
	import { invalidate } from '$app/navigation';

	export let open = false;
	let userID: number;

	let defaultData = {
		difficulty: 3,
		description: '',
		languages: [],
		tags: [],
		date: new Date(),
		length: 5
	};

	export let inputData = { ...defaultData };

	function createRecordWrapper() {
		createRecord(
			inputData.date,
			inputData.length,
			inputData.languages.map((lang) => languageIDs[lang]),
			inputData.difficulty,
			inputData.description,
			inputData.tags.map((tag) => $tagStore[$tagStore.map((tag2) => tag2.name).indexOf(tag)].id),
			$currentUser.is_manager ? $userStore[userID].id : $currentUser.id
		);

		open = false;

		inputData = { ...defaultData };

		invalidate('home');
	}
</script>

<Sidebar bind:open title="Nový záznam">
	{#if !($currentUser.is_manager && $userStore.length == 0)}
		{#if $currentUser.is_manager}
			<div class="menu-wrapper">
				<ManagerMenu bind:selectedUserID={userID} labelType="white" />
			</div>
		{/if}

		<div class="wrapper">
			<div class="diffuculty">
				<div class="label-wrapper"><Label>Obtížnost</Label></div>
				<Range bind:value={inputData.difficulty} />
			</div>
			<div class="multiselect-wrapper">
				<Label>Programovací jazyky</Label>
				<Multiselect
					placeholder="Vybrat jazyk"
					bind:selected={inputData.languages}
					options={Object.values(languageNames)} />
			</div>
			<div class="multiselect-wrapper">
				<Label>Štítky</Label>
				<Multiselect
					placeholder="Vybrat štítky"
					bind:selected={inputData.tags}
					options={$tagStore.map((tag) => tag.name)} />
			</div>
			<div class="description">
				<Textarea
					bind:value={inputData.description}
					placeholder="Naučil jsem se používat print() v Pythonu"
					label="Popis" />
			</div>

			<div class="datetime">
				<div class="date">
					<Label>Datum</Label>
					<Datepicker bind:value={inputData.date} />
				</div>
				<div class="time">
					<Number label="Délka tréninku" id="training" step={5} bind:value={inputData.length} />
				</div>
			</div>

			<Button on:click={createRecordWrapper}>Přidat záznam</Button>
		</div>
	{:else}
		<ManagerMenu bind:selectedUserID={userID} labelType="white" />

		<p>
			Máte manažerský účet ale žádného přiřazeného uživatele, vytvořte jedneho z hlavního stránky
		</p>
	{/if}
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
