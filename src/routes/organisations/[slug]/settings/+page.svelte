<script>
    import Header from "$lib/blocks/header.svelte";
    import Content from "$lib/blocks/content.svelte";
</script>

<main>


     
    

    <Header title={"Organisations-Settings"}></Header>

    <Content>

        <form action="">
            <div class="form-block">
                <label for="Name">Organisationsname</label>
                <input id="name" type="text">
            </div>
            <div class="form-block">
                <label for="description">Beschreibung</label>
                <input id="description" type="text">
            </div>
            <div class="form-block">
                <label for="logo">Logo</label>
                <input id="logo" type="file">
            </div>
            <div class="form-block">
                <label for="color">Organisationsfarbe</label>
                <input id="color" type="color">
            </div>
            <div class="form-block submit">
                <button type="submit">Speichern</button>
            </div>

        </form>

    </Content>    

    
</main>



<style>
  main {
        padding: calc( var(--unit) * 1);
        margin: calc( var(--unit) * 1);
        border-radius: var(--corner);
        background-color: var(--white);
    }
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: calc(var(--unit) / 2);
    }


    form {
        
        /* max-width: 500px; */
        background-color: var(--color-1-light);
        border-radius: var(--corner);
    }

    h2 span {
        vertical-align: sub;
        font-size: 36px;
        margin-right:10px;
    }


</style>