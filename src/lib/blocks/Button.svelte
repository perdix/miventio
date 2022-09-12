<button>
	<slot />
</button>

<style>
	button {
		text-transform: uppercase;
		padding: 0.6rem 1.7rem;
		color: var(--white);
		border: none;
		border-radius: 0.3rem;
		transition: 0.2s;
		font-size: 1.2rem;
		box-shadow: var(--shadow-light);
		background: linear-gradient(132deg, var(--color-1) 0%, var(--color-2) 100%);
		background-position: 0%;
		background-size: 200%;
	}
	button:hover {
		cursor: pointer;
		background-position: 100%;
		box-shadow: var(--shadow);
	}
</style>
