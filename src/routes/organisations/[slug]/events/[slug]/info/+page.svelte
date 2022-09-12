<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
</script>

<Header title={'Basis Info'} />

<Content>
	<form action="" class="miventio row">
		<div class="md-12">
			<label for="Name">Name der Veranstaltung</label>
			<input id="name" type="text" />
		</div>
		<div class="md-12">
			<label for="description">Beschreibung</label>
			<input id="description" type="text" />
		</div>
		<div class="md-12">
			<label for="von">Veranstaltungsstart</label>
			<input id="von" type="date" />
		</div>
		<div class="md-12">
			<label for="bis">Veranstaltungsende</label>
			<input id="bis" type="date" />
		</div>

		<div class="md-12 submit">
			<button type="submit">Speichern</button>
		</div>
	</form>
</Content>

<style>
	form {
		background-color: var(--color-1-light);
		border-radius: var(--corner);
	}
</style>
