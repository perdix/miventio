<script>
    import Header from "$lib/blocks/Header.svelte";
    import Content from "$lib/blocks/Content.svelte";
    import Main from "$lib/blocks/Main.svelte";
</script>

<Main>    

    <Header title={"Organisation-Settings"}></Header>

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
                <input id="color" type="color" value="#eeeeee">
            </div>
            <div class="form-block submit">
                <button type="submit">Speichern</button>
            </div>

        </form>

    </Content>    

    
</Main>



<style>
    form {
        background-color: var(--color-1-light);
        border-radius: var(--corner);
    }


</style>