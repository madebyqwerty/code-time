<script lang="ts">
	import MultiSelect from 'svelte-multiselect';
	import LanguageSlot from './LanguageSlot.svelte';

	export let placeholder: string;

	export let options: string[];
	export let selected: string[];
</script>

<MultiSelect
	id="fav-languages"
	{options}
	{placeholder}
	noMatchingOptionsMsg="Žádná další možnost"
	bind:selected>
	<LanguageSlot let:option {option} slot="selected" />
	<LanguageSlot let:option {option} slot="option" />
</MultiSelect>

<style lang="scss">
	:global(div.multiselect > ul.options) {
		@include scrollbars(10px, $green-primary, lighten($background, 5));
		background: lighten($background, 5);
		border-radius: 0px;
		z-index: 150 !important;
	}
	:global(div.multiselect > ul.selected > li) {
		background: lighten($background, 10);
	}

	:global(div.multiselect) {
		border: 1px solid $green-primary;
		background-color: transparent;
		padding: 0.8rem;
		color: $green-lightest;
		border-radius: 0;
	}

	:global(div.multiselect input::placeholder) {
		color: $green-lightest;
	}
</style>
