<script>
	import Main from '$lib/blocks/Main.svelte';
	import Header from '$lib/blocks/Header.svelte';
	import Box from '$lib/blocks/Box.svelte';
	import {page} from '$app/stores';
	import {organisation} from '$lib/store/organisation';

	let user = {};
	let message = "";

	const updateUser = async () => {
		if (user.password == user.passwordRepeat) {
			const res = await fetch(`/users/${$page.data.user.id}`, {
				method: 'PUT',
				body: JSON.stringify(user)
			});
			if (res.status === 200) {
				message = "Password wurde erfolgreich geändert!";
			}
		}
	}

</script>

<Main>
	<Header title="Account-Einstellungen">
		<a href={`/organisation/${$organisation.id}`} class="close"><span class="material-symbols-outlined">close</span></a>	
	</Header>

	<div class="row">
		<div class="md-12 col">
			<Box>
				<h2>Meine Daten</h2>
				<form class="miventio row" on:submit|preventDefault = {updateUser}>
					<div class="md-12">
						<label for="email">E-Mail</label>
						<input id="email" type="email" disabled value="{$page.data.user.email}"/>
					</div>
					<div class="md-6">
						<label for="password">Passwort</label>
						<input id="password" type="password" bind:value="{user.password}"/>
					</div>
					<div class="md-6">
						<label for="password-repeat">Passwort Wiederholung</label>
						<input id="password-repeat" type="password" bind:value="{user.passwordRepeat}"/>
					</div>
					<div class="md-12 submit">
						<button type="submit">Speichern</button>
					</div>
					{#if message}
					<div class="md-12 submit">
						<div class="message">{ message || ''}</div>
					</div>	
					{/if}
					
				</form>
			</Box>
		</div>
		<div class="md-12 col">
			<Box>
				<h2>Meine Organisationen</h2>

				{#each $page.data.user.organisations as organisation}
					<div class="organisation">
						{organisation.name}
					</div>
				{/each}

				</Box>
		</div>
	</div>
</Main>

<style>

	h2 {
		font-weight: 300;
		font-size: 25px;
		margin-bottom: 20px;
		margin-top:30px;
	}
	.organisation {
		background-color: white;
		padding: var(--unit);
		border-radius: var(--corner);
		margin-bottom: 5px;
		/* cursor: pointer; */
	}
	.message {
		background-color: var(--color-1-light);
		padding: 20px;
		display: inline-block;
	}

</style>
