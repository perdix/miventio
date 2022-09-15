<script>
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import { page } from '$app/stores';
</script>

<Header />
<Navigation organisations={$page.data.organisations} organisation={$page.data.organisation} />

<slot/>

<style>
	
</style>
