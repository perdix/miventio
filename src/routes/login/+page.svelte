<script>
	let email;
	let password;
	let error = '';

	const handleLogin = async () => {
		const response = await fetch('/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			})
		});
		const content = await response.json();
		if (response.status == 200) {
			window.location.href = `/organisation/${content.user.organisations[0].organisationId}`;
		} else {
			error = content.message;
		}
		// const session = await response.json();

		// const { error } = response;
		// if (error) {
		// 	alert(error);
		// } else {
		//     window.location.href = '/organisation/';
		// }
	};
</script>

<div class="page">
	<div class="left" />

	<div class="right">
		<h1 class="logo">miventio</h1>
		<h2>Event- und Organisationsplaner</h2>
		<form class="miventio row" on:submit|preventDefault={handleLogin}>
			<div class="md-12">
				<label for="email">Email</label>
				<input id="email" type="email" bind:value={email} />
			</div>
			<div class="md-12">
				<label for="password">Password</label>
				<input id="password" type="password" bind:value={password} />
			</div>
			<div class="md-12 submit">
				<button type="submit">Einloggen</button>
			</div>
			<div class="md-12">
				{#if error !== ''}
					<p class="error-box">
						{error}
					</p>
				{/if}
			</div>
		</form>
	</div>
</div>

<style>
	.page {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		min-height: 100vh;
	}
	.left {
		width: 22%;
		background: linear-gradient(-60deg, var(--color-1) 0%, var(--color-1-dark) 100%);
	}
	.right {
		width: 78%;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
		padding: calc(var(--unit) * 3);
		background-color: var(--lightgrey);
	}

	form {
		margin-top: 40px;
		min-width: 400px;
		max-width: 600px;
	}
</style>
