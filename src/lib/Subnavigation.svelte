<script>
    export let items = []
    import { organisation } from '$lib/store/organisation';
</script>

<nav class="subnav">
    <ul>
        {#each items as item}
            {#if item.status == 'active'}
                <li><a href="/organisation/{$organisation.id}/{item.slug}" class="active">{item.name}</a></li>
            {:else}
            <li><a href="/organisation/{$organisation.id}/{item.slug}">{item.name}</a></li>
            {/if}   
        {/each}
    </ul>

</nav>


<style>

.subnav ul {
    display: grid;
    grid-auto-flow: column;
    list-style: none;
    margin:0;
    padding:0;
    height: 50px;
}
.subnav ul li a {
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: var(--color-1-dark);
    background: linear-gradient(-80deg, var(--lightgrey) 0%, var(--grey) 100%);
    font-weight: 400;
    font-size: 1.1rem;
    transition: all 0.5s;
}
.subnav ul li a:hover, .subnav ul li a.active {
    background: rgba(255, 255, 255, 0.366);
    transition: all 0.5s;
}


</style>
