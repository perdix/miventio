<script>
    import { slide } from 'svelte/transition';

    export let show = false;
    export let message= ''

	let close = () => {
		show = false;
	};

    $: {
        if (show) {
            setTimeout(() => {
                show = false;
            }, 3000)
        }
    }
   
</script>
{#if show}
    <div class="notification" transition:slide>
        <p>{message}</p>
        <span class="material-symbols-outlined close" on:click={close}>close</span>

    </div>
{/if}

<style>
    .notification {
        position: fixed;
        padding: calc( var(--unit) / 2);
        left:0;
        bottom: 0;
        width: 100%;
        /* height: 100px; */
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--color-2-dark);
    }
    p {
        font-size: 1.2rem;
        color: var(--white);
        font-weight: 300;
    }
    span {
        font-size: 15px;
        background-color: transparent;
        color: white;
    }
    span:hover {
        background-color: rgba(255, 255, 255, 0.18);
    }
</style>