<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Textarea from '$lib/components/forms/Textarea.svelte';
	import Range from '$lib/components/forms/Range.svelte';
	import Button from '$lib/components/Button.svelte';
	import { createRecord, currentUser } from '$lib/pocketbase';
	import Multiselect from '$lib/components/forms/Multiselect.svelte';
	import { languageIDs, languageNames } from '$lib/utils/languages';
	import { tagStore } from '$lib/pocketbase/tagStore';
	import { userStore } from '$lib/pocketbase/userStore';
	import ManagerMenu from './manager/ManagerMenu.svelte';
	import Label from '$lib/components/forms/Label.svelte';
	import { onMount } from 'svelte';
	import { Czech } from 'flatpickr/dist/l10n/cs';
	import flatpickr from 'flatpickr';
	import type { Instance } from 'flatpickr/dist/types/instance';
	import './Sidenav/datepicker.css';
	import Number from '$lib/components/forms/Number.svelte';

	export let open = false;
	let userID: number;

	let selectedOptions: string[];
	let diff: number;
	let w;
	export let inputData = {
		difficulty: '3',
		description: '',
		languages: [],
		tags: [],
		date: new Date()
	};

	function createRecordWrapper() {
		createRecord(
			new Date(),
			10,
			inputData.languages.map((lang) => languageIDs[lang]),
			parseInt(inputData.difficulty),
			inputData.description,
			inputData.tags.map((tag) => $tagStore[$tagStore.map((tag2) => tag2.name).indexOf(tag)].id),
			$userStore[userID].id
		);
	}

	let datepicker;

	onMount(() => {
		datepicker = flatpickr('.flatpickr', {
			mode: 'single',
			locale: Czech,
			onClose: (e) => (inputData.date = e[0]),
			defaultDate: inputData.date
		}) as Instance;
	});
</script>

<Sidebar bind:open title="Nový záznam">
	{#if !($currentUser.is_manager && $userStore.length == 0)}
		{#if $currentUser.is_manager}
			<div class="menu-wrapper">
				<ManagerMenu bind:selectedUserID={userID} labelType="white" />
			</div>
		{/if}

		<div class="wrapper">
			<div class="description">
				<Textarea
					bind:value={inputData.description}
					placeholder="Naučil jsem se používat print() v Pythonu"
					label="Popis"
				/>
			</div>

			<div class="diffuculty">
				<div class="label-wrapper"><Label>Obtížnost</Label></div>
				<Range bind:value={inputData.difficulty} name="obtiznost" />
			</div>

			<div class="datetime">
				<div class="date">
					<Label>Datum</Label>
					<input
						class="flatpickr flatpickr-input"
						type="text"
						placeholder="Vyber rozmezí"
						data-id="range"
						readonly={true}
					/>
				</div>
				<div class="time">
					<Number label="Délka tréninku" id="training" step={5} />
				</div>
			</div>

			<div class="multiselect-wrapper">
				<Label>Programovací jazyky</Label>
				<Multiselect
					placeholder="Vybrat jazyk"
					bind:selected={inputData.languages}
					options={Object.values(languageNames)}
				/>
			</div>
			<div class="multiselect-wrapper">
				<Label>Štítky</Label>
				<Multiselect
					placeholder="Vybrat štítky"
					bind:selected={inputData.tags}
					options={$tagStore.map((tag) => tag.name)}
				/>
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
		gap: 3.2rem;
	}

	input {
		color: $green-lightest;
		border: 1px solid $green-primary;
		background: transparent;
		padding: 0.8rem;
		display: block;
		width: 100%;
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
