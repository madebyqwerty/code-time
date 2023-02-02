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
