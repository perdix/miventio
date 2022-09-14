<script>
	import Events from '$lib/Events.svelte';
	import { page } from '$app/stores';
</script>

<div class="page">
	<Events events={$page.data.events}/>
</div>
