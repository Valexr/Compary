<script>
	import { Compary } from 'svelte-compary';
	let name = 'Compary',
		value = 50,
		img = {
			after: 'img/color.jpg',
			before: 'img/bw.jpg',
		};
</script>

<h1>Hello <b>{name}</b>!</h1>

<Compary {value} {img} />

<style>
	/* For demo */
	:global(body) {
		font-family: ui-sansserif, system-ui, sans-serif;
		color: silver;
		margin: 0 auto;
		padding: 1rem;
		max-width: 1000px;
	}
	b {
		color: hsl(339.1, 80.9%, 61%);
	}
</style>
