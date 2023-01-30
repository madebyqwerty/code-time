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

	export let open = false;
	let userID: number;

	let selectedOptions: string[];
	let diff: number;
	let w;
	export let inputData = {
		difficulty: '3',
		description: '',
		languages: [],
		tags: []
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
</script>

<Sidebar bind:open title="Nový záznam">
	{#if !($currentUser.is_manager && $userStore.length == 0)}
		{#if $currentUser.is_manager}
			<div class="menu-wrapper">
				<ManagerMenu bind:selectedUserID={userID} labelType="white" />
			</div>
		{/if}

		<div class="wrapper">
			<Textarea
				bind:value={inputData.description}
				placeholder="Naučil jsem se používat print() v Pythonu"
				label="Popis"
			/>
			<Range bind:value={inputData.difficulty} name="obtiznost" label="Obtížnost" />
			<div id="meter" bind:clientWidth={w} style="width:100%;" />
			<div class="multiselect-wrapper">
				<Multiselect
					placeholder="Vybrat jazyk"
					bind:selected={inputData.languages}
					options={Object.values(languageNames)}
				/>
			</div>
			<div class="multiselect-wrapper">
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

<style>
	.multiselect-wrapper {
		margin: 2rem 0;
	}
	.menu-wrapper {
		margin-bottom: 0.8rem;
	}
</style>
