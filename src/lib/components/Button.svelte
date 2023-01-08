<script lang="ts">
	export let type: 'primary' | 'secondary' | 'close' = 'primary';
</script>

<button class="{type} text-base" on:click>
	<slot />
</button>

<style lang="scss">
	@mixin button-default(
		$background,
		$border,
		$color,
		$hoverbackground,
		$hoverborder,
		$hovercolor,
		$activebackground: none,
		$activeborder: $background,
		$activecolor: $color
	) {
		background: $background;
		border: 2px solid $border;
		transition: 0ms;
		padding: 1.6rem;
		cursor: pointer;
		color: $color;
		&:hover {
			background: $hoverbackground;
			border-color: $hoverborder;
			color: $hovercolor;
		}
		&:active {
			background: $activebackground;
			color: $activecolor;
		}
	}

	.primary {
		@include button-default(
			$green-primary,
			$green-primary,
			$green-darkest,
			$green-light,
			$green-light,
			$green-darkest,
			none,
			$green-primary,
			$green-primary
		);
	}

	.secondary {
		@include button-default(
			none,
			$green-primary,
			$green-primary,
			none,
			$green-light,
			$green-light,
			$green-lightest,
			$green-lightest,
			$green-lightest
		);
	}

	.close {
		@include button-default(
			none,
			$red-primary,
			$red-primary,
			none,
			$red-light,
			$red-light,
			none,
			$red-lightest,
			$red-lightest
		);
	}
</style>
