<script>
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import { page } from '$app/stores';
	import { organisation } from '$lib/store/organisation'
	$organisation = { ...$page.data.organisation };
</script>

<div class="main-nav">
	<Header />
	<Navigation organisations={$page.data.session.organisations} organisation={$organisation} />
</div>

<div class="placeholder">

</div>
<slot/>

<style>
	.main-nav {
		position: fixed;
		width: 100%;
		z-index: 100;
	}
	.placeholder {
		height:175px;
	}
</style>
