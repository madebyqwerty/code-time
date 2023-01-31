<script>
	import '../app.scss';
	import 'iconify-icon';

	import { SvelteToast } from '@zerodevx/svelte-toast';
	import Button from '$lib/components/Button.svelte';

</script>

<main class="text-base">
	<slot />
</main>
<div class="toast-wrap">
	<SvelteToast options={{ reversed: true, intro: { y: 50 } }} />
</div>
<style lang="scss">
	main {
		color: $green-lightest;
	}
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: auto;
		--toastContainerBottom: 2rem;
		--toastContainerLeft: calc(50vw - 8rem);
		--toastBackground: #181c24;
		--toastBarHeight: 0;
		--toastWidth:auto;
		--toastBtnWidth:2.5rem;
		--toastBtnHeight:2rem;
		--toastBtnFont: normal normal normal 900 2rem/2rem "Fira Code";
	}
	:global(._toastItem) {
		border-width: 2px !important;
		border-style: solid !important;
		border-color:$red-dark !important;
		padding:1.2rem 1.5rem !important;
		max-width:50vw !important;
	}
	:global(.ikonka) {
		display: inline-block !important;
		height: 100% !important;
	}
	:global(._toastMsg) {
		padding: 0 !important;
	}
	:global(._toastBtn::after) {
		padding-left: 1rem !important;
	}
</style>
