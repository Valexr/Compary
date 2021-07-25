<script>
	import { Compary } from 'svelte-compary';
	let name = 'Compary';
	let value = 50;
</script>

<h1>Hello <b>{name}</b>!</h1>

<Compary />

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
		color: #28ae60;
	}
</style>
