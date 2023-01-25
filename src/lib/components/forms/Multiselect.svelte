<script lang="ts">
	import MultiSelect from 'svelte-multiselect';
	import LanguageSlot from './LanguageSlot.svelte';

	export let placeholder: string;

	export let options: string[];
	export let selected: string[];
</script>

<MultiSelect id="fav-languages" {options} {placeholder} bind:selected>
	<LanguageSlot let:option {option} slot="selected" />
	<LanguageSlot let:option {option} slot="option" />
</MultiSelect>

<style lang="scss">
	:global(div.multiselect > ul.options) {
		background: lighten($background, 5);
	}
	:global(div.multiselect > ul.selected > li) {
		background: lighten($background, 10);
	}
</style>
