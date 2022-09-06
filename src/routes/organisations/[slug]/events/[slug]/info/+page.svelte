<script>
    import Header from "$lib/blocks/header.svelte";
    import Content from "$lib/blocks/content.svelte";
</script>


    <Header title={"Basis Info"} />   

    <Content>
        <form action="">
            <div class="form-block">
                <label for="Name">Name der Veranstaltung</label>
                <input id="name" type="text">
            </div>
            <div class="form-block">
                <label for="description">Beschreibung</label>
                <input id="description" type="text">
            </div>
            <div class="form-block">
                <label for="von">Veranstaltungsstart</label>
                <input id="von" type="date">
            </div>
            <div class="form-block">
                <label for="bis">Veranstaltungsende</label>
                <input id="bis" type="date">
            </div>
         
            <div class="form-block submit">
                <button type="submit">Speichern</button>
            </div>
    
        </form>
    </Content>    

<style>
    form {
        background-color: var(--color-1-light);
        border-radius: var(--corner);
    }
</style>