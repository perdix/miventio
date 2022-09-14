<script>
	import Main from '$lib/blocks/Main.svelte';
	import Header from '$lib/blocks/Header.svelte';
	import Box from '$lib/blocks/Box.svelte';

	const organisations = [
		{ name: 'Gesellschaft für Parodontologie' },
		{ name: 'Gesellschaft für Kardiologie' }
	];
</script>

<Main>
	<Header title="Account-Einstellungen" >
		<a href="/organisations/1" class="close"><span class="material-symbols-outlined">close</span></a>	
	</Header>

	<div class="row">
		<div class="md-6 left">
			<Box>
				<h2>Meine Daten</h2>
				<form action="" class="miventio row">
					<div class="md-12">
						<label for="email">E-Mail</label>
						<input id="email" type="email" disabled />
					</div>
					<div class="md-12">
						<label for="username">Username</label>
						<input id="username" type="text" />
					</div>
					<div class="md-6">
						<label for="password">Passwort</label>
						<input id="password" type="password" />
					</div>
					<div class="md-6">
						<label for="password-repeat">Passwort Wiederholung</label>
						<input id="password-repea" type="password" />
					</div>
					<div class="md-12 submit">
						<button type="submit">Speichern</button>
					</div>
				</form>
			</Box>
		</div>
		<div class="md-6 right">
			<Box>
				<h2>Meine Organisationen</h2>

				{#each organisations as organisation}
					<div class="organisation">
						{organisation.name}
					</div>
				{/each}

				</Box>
		</div>
	</div>
</Main>

<style>
	.left,
	.right {
		padding: 30px;
	}

	h2 {
		font-weight: 300;
		font-size: 25px;
		margin-bottom: 30px;
	}
	.organisation {
		background-color: white;
		padding: var(--unit);
		border-radius: var(--corner);
		margin-bottom: 5px;
		cursor: pointer;
	}
	.close {
		display: block;
		padding: 10px;
		border-radius: var(--corner);
		background-color: var(--grey);
		
	}
	.close:hover {
		box-shadow: var(--shadow-light);
	}
</style>
