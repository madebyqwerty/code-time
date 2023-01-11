<script lang="ts">
	import MultiSelect from 'svelte-multiselect';
	import LanguageSlot from './LanguageSlot.svelte';

	const langs = {
		HTML: '#e34c26',
		CSS: '#264de4',
		Java: '#F9A825',
		'C++': '#00599C',
		Python: '#17739f',
		JavaScript: '#af9a0e',
		'C#': '#8E44AD',
		PHP: '#7D3C98',
		Ruby: '#E0115F',
		Perl: '#0298C3',
		Swift: '#FA7143',
		Go: '#00ADD8',
		Kotlin: '#F18E33',
		Scala: '#e92926',
		R: '#198CE7',
		Bash: '#6bb33e',
		Rust: '#DEA584',
		'Objective-C': '#438EFF',
		React: '#22a2c5',
		Angular: '#DD0031',
		Vue: '#41B883',
		Ember: '#b3a700',
		Svelte: '#FF3E00',
		C: '#555555',
		Cobol: '#b18f00',
		Fortran: '#4D41B1',
		Lisp: '#3F5EAB',
		Pascal: '#809a2a',
		SQL: '#00758f',
		TypeScript: '#007ACC',
		Elixir: '#6E4A7E',
		Erlang: '#B83998',
		Julia: '#A270BA',
		Haskell: '#186c28',
		Clojure: '#DB5855',
		OCaml: '#1a9015',
		'F#': '#B845FC',
		WebAssembly: '#0467FB'
	};
	const languages = Object.keys(langs);

	let selected: string[];
</script>

<pre>selected = {JSON.stringify(selected)}</pre>

<MultiSelect id="fav-languages" options={languages} placeholder="Take your pick..." bind:selected>
	<LanguageSlot let:option {option} slot="selected" />
	<LanguageSlot let:option {option} slot="option" />
</MultiSelect>

<style lang="scss">
	:global(div.multiselect > ul.options) {
		background: lighten($background,5);
	}
    :global(div.multiselect > ul.selected > li){
        background: lighten($background,10)
    }
</style>
