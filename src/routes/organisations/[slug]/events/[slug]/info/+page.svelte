<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
</script>

<Header title={'Allgemeine Infos'} />

<Content>
	<form action="" class="miventio row">
		<div class="md-12">
			<label for="Name">Veranstaltungstitel</label>
			<input id="name" type="text" />
		</div>
		<div class="md-12">
			<label for="description">Beschreibung</label>
			<input id="description" type="text" />
		</div>
		<div class="md-6">
			<label for="location">Location</label>
			<input id="location" type="text" />
		</div>
		<div class="md-6">
			<label for="city">Stadt</label>
			<input id="city" type="text" />
		</div>
		<div class="md-12">
			<label for="von">Start</label>
			<input id="von" type="date" />
		</div>
		<div class="md-12">
			<label for="bis">Ende</label>
			<input id="bis" type="date" />
		</div>

		<div class="md-12 submit">
			<button type="submit">Speichern</button>
		</div>
	</form>
</Content>

<style>

</style>
