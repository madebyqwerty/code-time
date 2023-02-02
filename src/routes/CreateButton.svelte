<script lang="ts">


	export let open: boolean;
	export let type: number = 1;
	export let white: boolean = false;
</script>

<button class="add-button {open ? 'activated' : ''} {white ? 'lol-white' : ''}" on:click>
	<div class="vert" style={type==2? "background:#f0f0f0;" : ""}/>
	<div class="hor" style={type==2? "background:#f0f0f0; " : ""}/>
</button>
<style lang="scss">
	.vert,
	.hor {
		position: absolute;
		background: $green-primary;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		
	}
	.vert {
		height: 2.8rem;
		width: 0.4rem;
		transition: 300ms ease !important;
	}
	.hor {
		height: .4rem;
		width: 2.8rem;
		transition: 300ms ease !important;
	}

	.add-button {
		position: relative;
		height: 2.8rem;
		width: 2.8rem;
	}
	.activated{
		& > .vert{
			height: 0rem;
		}
		& > .hor{
			width: 0rem;
		}
	}
</style>

