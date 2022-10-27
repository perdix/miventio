<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import { page } from '$app/stores';

	const url = `${$page.url.origin}/form/${$page.params.eventId}`;
</script>

<Header title={'Anmeldeformular'} />

<Content>
	<h2>Link zum Anmeldeformular</h2>

	<div>
		<a href={url} target="_blank">{url}</a>
	</div>

	<h2>Einbinden mit dem Embed-Tag</h2>

	<div>
		<code>
			&lt;embed type="text/html" src="{url}" width="600" &gt;
		</code>
	</div>
</Content>

<style>
	h2 {
		font-weight: 400;
		font-size: 1.5rem;
	}
	div {
		margin-top: 10px;
		margin-bottom: 30px;
		font-size: 1.2rem;
	}
	a,
	code {
		background-color: white;
		padding: 30px;
		display: block;
		font-size: 1rem;
	}
</style>
