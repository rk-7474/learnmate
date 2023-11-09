 <script>
    export let show;
    export let pos;
    export let handleClick;

    const options = [
        {text: "Riassumi", type: "riassumi"},
        {text: "Approfondisci", type: "approfondisci"},
        {text: "Organizza", type: "organizza"},
        {text: "Correggi", type: "correggi"},
        {text: "Sottolinea", type: "sottolinea"},
    ]

</script>

<main>
    {#if (show)}
        <div id="context-menu" style="left: {pos.x}px; top: {pos.y}px" on:focusout={() => show = false}>
            {#each options as {type, text}}
                <button on:click={() => handleClick(type)}>
                    {text}
                </button>
            {/each}
        </div>
    {/if}
    
</main>

<style>
    #context-menu {
        position: absolute;
        min-width: 150px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
    }

    #context-menu button {
        transition: .3s ease;
        padding: 8px 12px;
        font-size: 1.1em;
        background-color: #474646;
        cursor: pointer;
    }

    #context-menu button:first-child {
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
    }

    #context-menu button:last-child {
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    
    #context-menu button:hover {
        background-color: #4e4e4e;
    }
</style>