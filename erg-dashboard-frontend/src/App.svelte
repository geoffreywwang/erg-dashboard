<script lang="ts">
	import Stats from "./Stats.svelte";

	let velocityData = [{t: 1613942227660, y: 1}, {t: 1613942246842, y: 4}, {t: 1613942286184, y: 7},];
	let torqueData = [{t: 1613942227660, y: 0}, {t: 1613942246842, y: -32}, {t: 1613942286184, y: 15},];
</script>

<main>
	<h1>Erg Dashboard</h1>
	<Stats {velocityData} {torqueData}/>	
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 3em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>