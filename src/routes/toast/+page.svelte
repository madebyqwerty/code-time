<script>
    	import { toast } from '@zerodevx/svelte-toast';
</script>


<Button
	on:click={() => {
		toast.push("<i class='ikonka'>X</i> lmao", {
			duration: 50000,
			theme: {
				'--toastBorder': '#ab55ab'
			}
		});
	}}>toast lmao</Button
>
