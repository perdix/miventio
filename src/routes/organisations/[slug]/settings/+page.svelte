<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import Main from '$lib/blocks/Main.svelte';
</script>

<Main>
	<Header title={'Settings'} >
		<a href="/organisations/1" class="close"><span class="material-symbols-outlined">close</span></a>	
	</Header>

	<Content>

	<div class="row">
		<div class="md-6">
			
				<h1>Allgemein</h1>
				<form action="" class="miventio row">
					<div class="md-12">
						<label for="Name">Organisationsname</label>
						<input id="name" type="text" />
					</div>
					<div class="md-12">
						<label for="description">Beschreibung</label>
						<input id="description" type="text" />
					</div>
					<div class="md-12">
						<label for="color">Organisationsfarbe</label>
						<input id="color" type="color" value="#eeeeee" />
					</div>
					<div class="md-12 submit">
						<button type="submit">Speichern</button>
					</div>
				</form>
		
		</div>
		<div class="md-6">

			<h1>Subscription</h1>
			<p>Welches Abo wurde gegewählt? </p>
	
		</div>

		<div class="md-12 box">

			<h1>Mitarbeiter</h1>
			<p>Tabelle mit allen Mitgliedern, die Admin-Rechte haben </p>

	</div>


	</div>




	</Content>




</Main>

<style>
	h1 {
		font-size: 1.5rem;
		font-weight: 300px;
		margin-bottom: calc (var(--unit) / 2);
	}
	.box {
		margin-top: var(--unit);
	}
</style>
