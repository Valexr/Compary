<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let value = 50,
		thumbcolor = 'hsl(339.1, 80.9%, 61%)',
		img = {
			left: '',
			right: '',
		};
</script>

<section class="c-compare" style="--value: {value}%; --thumb-bgc: {thumbcolor}">
	<img class="c-compare__left" src={img.left} alt="after" />
	<img class="c-compare__right" src={img.right} alt="before" />
	<input
		type="range"
		class="c-compare__range"
		min="0"
		max="100"
		{value}
		on:input={(e) => ((value = e.target.value), dispatch('input', e.target.value))}
		on:change={(e) => dispatch('change', e.target.value)}
	/>
</section>

<style>
	.c-compare {
		--h: 9;
		--m: 1rem 0;
		--w: 16;
		--thumb-bgc: hsl(339.1, 80.9%, 61%);
		--thumb-bgc-focus: hsl(339.1, 80.9%, 61%, 0.7);
		--thumb-w: 2rem;
		margin: var(--m);
		position: relative;
	}
	.c-compare::after {
		content: '';
		display: block;
		padding-bottom: calc((var(--h) / var(--w)) * 100%);
	}
	img {
		max-width: 100%;
		width: 100%;
		height: 100%;
		position: absolute;
		object-fit: cover;
		color: transparent;
	}
	img::before,
	img::after {
		content: attr(alt);
		/* content: url('img/color.jpg'); */
		color: white;
		position: absolute;
		padding: 1em;
		z-index: 1;
	}
	img::after {
		right: 0;
	}
	.c-compare__left {
		background-color: var(--thumb-bgc-focus);
		clip-path: polygon(0% 0%, var(--value) 0%, var(--value) 100%, 0% 100%);
	}
	.c-compare__right {
		background-color: silver;
		clip-path: polygon(100% 0%, var(--value) 0%, var(--value) 100%, 100% 100%);
	}
	.c-compare__range {
		background-color: transparent;
		box-sizing: border-box;
		font-family: inherit;
		height: 100%;
		margin: 0;
		outline: none;
		position: absolute;
		top: 0;
		width: 100%;
		font-size: 0;
		border: 0;
	}

	.c-compare__range::-webkit-slider-thumb {
		background-color: var(--thumb-bgc);
		box-sizing: border-box;
		width: var(--thumb-w);
		height: 2rem;
		border-radius: 100%;
		position: relative;
		top: 50%;
		margin-top: -1rem;
		transform: translateX(calc(var(--value) - 50%));
		border: 0;
	}
	.c-compare__range:focus::-webkit-slider-thumb {
		background-color: var(--thumb-bgc-focus);
	}
	.c-compare__range::-webkit-slider-runnable-track {
		background: transparent;
		background-size: 100%;
		box-sizing: border-box;
		height: 100%;
	}

	.c-compare__range::-moz-range-thumb {
		background-color: var(--thumb-bgc);
		box-sizing: border-box;
		width: var(--thumb-w);
		height: 2rem;
		border-radius: 100%;
		transform: translateX(calc(var(--value) - 50%));
	}
	.c-compare__range:focus::-moz-range-thumb {
		background-color: var(--thumb-bgc-focus);
	}
	.c-compare__range::-moz-range-track {
		background: transparent;
		background-size: 100%;
		box-sizing: border-box;
		height: 100%;
	}

	.c-compare__range,
	.c-compare__range::-webkit-slider-runnable-track,
	.c-compare__range::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
	}
</style>
