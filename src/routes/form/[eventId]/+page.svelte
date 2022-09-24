<script>
	import Registration from '$lib/Registration/Registration.svelte';
	import { page } from '$app/stores';
</script>

<div>
	<Registration event={$page.data.event} />
</div>

<style>
	div {
		padding: 10px;
	}
</style>
