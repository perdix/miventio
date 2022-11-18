<script>
	import Main from './blocks/Main.svelte';
	import Header from './blocks/Header.svelte';
	import Content from './blocks/Content.svelte';
	import { createEventDispatcher } from 'svelte';
	export let title = '';
	export let show = false;
	export let maxWidth = '100%';
	const dispatch = createEventDispatcher();

	let close = () => {
		dispatch('close', {
			show: false
		});
	};
</script>

<div id="popup" class:visible={show} class:hidden={!show}>
	<div class="background">
		"
		<div class="box" style="max-width:{maxWidth}">
			<Main>
				<Header {title}>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<span class="material-symbols-outlined close" on:click={close}>close</span>
				</Header>
				<Content>
					<slot />
				</Content>
			</Main>
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
		position: absolute;
		z-index: 150;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
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
		max-height: 100vh;
		/* overflow: hidden; */
	}
</style>
