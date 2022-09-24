<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import { createEventDispatcher } from 'svelte';
	export let title = '';
	export let show = false;
	const dispatch = createEventDispatcher();

	let close = () => {
		dispatch('close', {
			show: false
		});
	};
</script>

<div id="popup" class:visible={show} class:hidden={!show}>
	<div class="background">
		<div class="box">
	
				<Header {title}>
					<span class="material-symbols-outlined close" on:click={close}>close</span>
				</Header>
				<div>
					<slot />
				</div>
				
		
		</div>
	</div>
</div>

<style>
	.close {
		cursor: pointer;
	}
	.hidden {
		display: none;
	}
	.visible {
		display: block;
	}
	.background {
		position: fixed;
		z-index: 150;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.6);
	}
	.box {
		background-color: white;
		box-shadow: var(--shadow);
		min-width: 30vw;
		border-radius: var(--corner);
		overflow: hidden;
	}
</style>
