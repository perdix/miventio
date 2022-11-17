<script>
	import Main from '$lib/blocks/Main.svelte';
	import Header from '$lib/blocks/Header.svelte';
	import Box from '$lib/blocks/Box.svelte';
	import { page } from '$app/stores';

	let user = {};
	let message = '';
	let status;

	const updateUser = async () => {
		console.log(user)
		const res = await fetch(`/users/${$page.data.user.id}`, {
			method: 'PUT',
			body: JSON.stringify(user)
		});
		if (res.status === 200) {
			message = 'Passwort wurde erfolgreich geändert!';
			status = res.status;
		}
		if (res.status === 404) {
			message = 'Passwort konnte nicht geändert werden!';
			status = res.status;
		}
	};
</script>

<Main>
	<Header title="Persönlicher Account">
		<a href="javascript:history.back()" class="close"
			><span class="material-symbols-outlined">close</span></a
		>
	</Header>

	<div class="row">
		<div class="col-12 col">
			<Box>
				<h2>Meine Daten</h2>
				<form class="miventio row" on:submit|preventDefault={updateUser}>
					<div class="col-12">
						<label for="email">E-Mail</label>
						<input id="email" type="email" disabled value={$page.data.user.email} />
					</div>
					<div class="col-6">
						<label for="password">Altes Passwort</label>
						<input id="password" type="password" bind:value={user.password} />
					</div>
					<div class="col-6">
						<label for="password-repeat">Neues Passwort</label>
						<input id="password-repeat" type="password" bind:value={user.newPassword} minlength="5" />
					</div>
					<div class="col-12 submit">
						<button type="submit">Speichern</button>
					</div>
					{#if message}
						<div class="col-12">
							<div class="message-box" class:error={status==404} class:confirmation={status==200}>{message || ''}</div>
						</div>
					{/if}
				</form>
			</Box>
		</div>
		<!-- <div class="col-12 col">
			<Box>
				<h2>Meine Organisationen</h2>

				{#each $page.data.user.organisations as organisation}
					<div class="organisation">
						{organisation.name}
					</div>
				{/each}
			</Box>
		</div> -->
	</div>
</Main>

<style>
	h2 {
		font-weight: 300;
		font-size: 25px;
		margin-bottom: 20px;
	}
	.organisation {
		background-color: white;
		padding: var(--unit);
		border-radius: var(--corner);
		margin-bottom: 5px;
		/* cursor: pointer; */
	}
</style>
