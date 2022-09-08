
<main>
    <div>
        <slot></slot>
    </div>
</main>
    


<style>
    main {
       padding: calc( var(--unit) * 1);
       background-color: var(--color-1-light);
       height: 100%;
       /* box-shadow: var(--shadow-light);   */
       position: relative;
       z-index: 1; 
    }   
    div {
        padding: calc( var(--unit) * 1);
        background-color: white;
        min-height: 500px;
        border-radius: var(--corner);
    }
</style>