<script lang="ts">
	export let option: string;
	export let gap = '5pt';

	const repo = `https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/icons`;

	$: lang = String(option)
		.toLowerCase()
		.replaceAll(`+`, `p`)
		.replace(`#`, `sharp`)
		.replace(`javascript`, `js`)
		.replace(`dart`, `dartlang`);
	$: src = `${repo}/file_type_${lang}.svg`;

	let hidden = false;
	// default back to visible every time src changes to see if the image loads successfully
	$: src, (hidden = false);
</script>

<span style:gap>
	{option}
</span>

<style lang="scss">
	span {
		display: flex;
	}
</style>
