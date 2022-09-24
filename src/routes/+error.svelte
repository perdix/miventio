<script>
	import { page } from '$app/stores';
</script>

<main>
	<div id="error">
		<h1>{$page.status}</h1>
		<h2>{$page.error.message}</h2>
		<br />
		<h3>Oops, something went wrong!</h3>
	</div>
</main>

<style>
	h1,
	h2,
	h3 {
		text-align: center;
	}
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
	}
	#error {
		margin-top: -200px;
	}
</style>
