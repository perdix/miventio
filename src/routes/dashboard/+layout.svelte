<script>
    import Header from "$lib/header.svelte";
    import logo from '$lib/assets/logo.jpg';
    /** @type {import('./$types').LayoutData} */
    export let data;
    
</script>

<Header />

  <nav>
    <div class="organisation">
        <img src={logo} alt="Logo Mandant">
        
        <select name="organisations" id="organisations">
            <option value="volvo">Gesellschaft für Parodontologie</option>
            <option value="saab">Gesellschaft für Innere Medizin</option>
        </select>

    </div>

    <ul>
        {#each data.sections as section}
            <li><a href="/dashboard/{section.slug}">{section.title}</a></li>
        {/each}
    </ul>

</nav>




<style>

    nav {
        background-color: var(--white);
        display: flex;
        justify-content: space-between;
        align-items: center;
        height:140px;
        padding: 0 var(--unit);
        width: 100%;
    }

    .organisation {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding:0.9rem 2rem;
        width: 100%;
        border-radius: 0.3rem;
        transition: 0.2s;

    }
    .organisation select, .organisation select:focus {
        background-color: var(--white);
        border:none;
        outline: none;
        font-size: 1.5rem;
        font-family: "Baskerville";
        padding:0.5rem 1rem;
        
    }
   
    img {
        height:40px;
    }

    ul {
        list-style-type: none;
        padding:0;
        display:flex;
        align-self: flex-end;
        justify-content: space-around;
        align-items: flex-end;
        position: relative;
        top:1px;
    }

    ul li a {
        text-decoration: none;
        color:black;
        padding: 10px 20px;
        margin-left:10px;
        border-radius: 10px 10px 0px 0;
        background-color: var(--white);
        color:var(--color-1-dark);
        display: block;
        font-size: 1.5rem;
    }
    ul li a:hover{
        background-color: var(--color-1-light);
        color:var(--color-1-dark);
    }




</style>


  
  <slot></slot>