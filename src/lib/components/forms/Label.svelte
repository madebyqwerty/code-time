<script lang="ts">
	export let forValue = '';
</script>

<label for={forValue} class="text-sm">
	<slot />
</label>

<style lang="scss">
	label {
		color: white;
	}
</style>
