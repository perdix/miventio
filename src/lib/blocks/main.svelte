<script>
    export let color = "#e6eef8";
</script>




<main style="background-color:{color}">
    <div>
        <slot></slot>
    </div>
</main>




<style>
    main {
       padding: calc( var(--unit) * 1);
    }   
    div {
        padding: calc( var(--unit) * 1);
        background-color: white;
        min-height: 500px;
        border-radius: var(--corner);
    }
</style>