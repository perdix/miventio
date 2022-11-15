<script>
	export let steps = [];
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const switchTo = (id, slug) => {
		dispatch('step', {
			id: id,
			slug: slug
		});
	};
</script>

<div class="stepper">
	<hr />
	{#each steps as step, i}
		<div
			class="step"
			class:first={i == 0}
			class:last={i == steps.length - 1}
			on:click={() => switchTo(step.id, step.slug)}
		>
			<span class="id">{step.id}</span>
			<p class="label">{step.name}</p>
		</div>
	{/each}
</div>

<style>
	.stepper {
		color: #262626;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		position: relative;
		z-index: 100;
		background-color: #e6e6e6;
		/* border-radius: 5px; */
		padding: 10px;
		overflow: hidden;
	}
	.stepper .step {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
	}
	.stepper .first {
		justify-content: flex-start;
	}
	.stepper .last {
		justify-content: flex-end;
	}

	.stepper .id {
		background-color: white;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		color: #262626;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		border: 1px solid #262626;
	}
	.stepper .label {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 0 10px;
		background-color: #e6e6e6;
		cursor: pointer;
	}
	.stepper hr {
		position: absolute;
		width: 90%;
		z-index: -1;
	}
</style>
