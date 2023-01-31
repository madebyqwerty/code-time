<script lang="ts">
	export let value = 3;
</script>

<div class="range-wrapper">
	<div class="input-wrapper2">
		<div class="range-label">
			<div class="smile">
				<div class="eye" />
				<div class="eye" />
				<div class="mth" />
				<div class="square" style="top:{80 - (value / 6) * 24}%;left:0%;" />
				<div class="square" style="top:{80 - (value / 6) * 24}%;left:80%;" />
			</div>
		</div>
	</div>

	<div class="rating">
		<label>
			<input type="radio" bind:group={value} name="stars" value="1" />
			<span class="star-icon-range">★</span>
		</label>
		<label>
			<input type="radio" bind:group={value} name="stars" value="2" />
			<span class="star-icon-range">★</span>
			<span class="star-icon-range">★</span>
		</label>
		<label>
			<input type="radio" bind:group={value} name="stars" value="3" />
			<span class="star-icon-range">★</span>
			<span class="star-icon-range">★</span>
			<span class="star-icon-range">★</span>
		</label>
		<label>
			<input type="radio" bind:group={value} name="stars" value="4" />
			<span class="star-icon-range">★</span>
			<span class="star-icon-range">★</span>
			<span class="star-icon-range">★</span>
			<span class="star-icon-range">★</span>
		</label>
		<label>
			<input type="radio" bind:group={value} name="stars" value="5" />
			<span class="star-icon-range">★</span>
			<span class="star-icon-range">★</span>
			<span class="star-icon-range">★</span>
			<span class="star-icon-range">★</span>
			<span class="star-icon-range">★</span>
		</label>
	</div>
</div>

<style lang="scss">
	.range-wrapper {
		display: flex;
		align-items: center;
		gap: 4rem;
	}

	.rating {
		position: relative;
		display: flex;
		height: 8rem;
		line-height: 8rem;
		font-size: 6rem;
		font-family: 'Silkscreen', monospace;
		width: 100%;
	}

	.rating label {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		cursor: pointer;
		display: flex;
	}

	.rating label:last-child {
		position: static;
	}

	@for $i from 1 through 5 {
		.rating label:nth-child(#{$i}) {
			z-index: calc(5 - $i + 1);
		}
	}

	.rating label input {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}

	.rating label .star-icon-range {
		float: left;
		color: transparent;
		-webkit-text-stroke: 2px lighten($green-primary, 25);
		transition: 250ms ease;
		transition-delay: 50ms;
		font-family: 'Silkscreen', monospace;
	}

	.rating label:last-child .star-icon-range {
		color: transparent;
	}

	.rating:not(:hover) label input:checked ~ .star-icon-range,
	.rating:hover label:hover input ~ .star-icon-range {
		color: lighten($green-primary, 25);
	}

	.rating label input:focus:not(:checked) ~ .star-icon-range {
		color: #000;
		text-shadow: 0 0 5px lighten($green-primary, 25);
	}

	.rating label input:focus:not(:checked) ~ .star-icon-range:last-child {
		color: #000;
		text-shadow: 0 0 5px lighten($green-primary, 25);
	}

	.eye,
	.square {
		height: 0.7rem;
		width: 0.7rem;
		background: $green-primary;
		position: absolute;
		transition: 140ms ease-in-out;
	}

	.mth {
		height: 0.7rem;
		width: 2.1rem;
		background: $green-primary;
		position: absolute;
		top: 68%;
		left: 20%;
		transition: 140ms ease-in-out;
	}

	.eye {
		top: 0%;
		left: 80%;
		&:first-child {
			left: 0%;
		}
		transition: 140ms ease-in-out;
	}

	.square {
		&:first-child {
			left: 0%;
		}
		&:last-child {
			left: 80%;
		}
		transition: 140ms ease-in-out;
	}

	.range-label {
		display: flex;
		flex-direction: row;
		gap: 3rem;
		align-items: flex-end;
		padding-top: 2rem;
	}

	.smile {
		position: relative;
		height: 3.5rem;
		width: 3.5rem;
	}
</style>
