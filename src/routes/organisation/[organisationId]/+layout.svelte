<script>
	import Header from '$lib/Header.svelte';
	import { page } from '$app/stores';
	import { organisation } from '$lib/store/organisation';
	$organisation = { ...$page.data.organisation };
</script>

<div data-sveltekit-prefetch>
	<div class="main-nav">
		<Header organisations={$page.data.session.organisations} organisation={$organisation} />
	</div>

	<div class="placeholder" />

	<div class="content">
		<slot />
	</div>
</div>

<style>
	.main-nav {
		position: fixed;
		width: 100%;
		z-index: 100;
	}
	.placeholder {
		height: 55px;
	}
	.content {
		min-height: calc(100vh - 55px);
		background-color: var(--lightgrey);
	}
</style>
