<script>
    //
    import ContextMenu from './ContextMenu.svelte'
    import { page } from '$app/stores';  
    import { desk_data } from 'src/stores.js';
    import AssistantMenu from './AssistantMenu.svelte';
    import { assistant_task } from './ai_assistant'
    import SelectionMenu from './SelectionMenu.svelte';
    import { onMount } from 'svelte';

	const sheet_id = $page.url.pathname.split("/").at(-1)
	const subject_id = $page.url.pathname.split("/").at(-2)
    const sheet = $desk_data[subject_id].sheets[sheet_id]

    let editable = true
    let value = sheet.text
    let showContextMenu = false
    let show_text_format = false
    let pos = { x: 0, y: 0 };
    let selection = '';
    let area, showAssistant;
    $: $desk_data[subject_id].sheets[sheet_id].text = value
	
    // $: selectionMenu(selection)

    const selectionMenu = (selection) => {
        if (selection)
            show_text_format = true
        else
            show_text_format = false
    }

    const removeSelection = () => {
        const temp_text = area.innerHTML.split("")

        const start = window.getSelection().anchorOffset
        const end = window.getSelection().focusOffset
        
        console.log(start, end)

        temp_text.splice(start, end-start)

        console.log(temp_text)

        area.innerHTML = temp_text.join("")
    }
    
	async function handleContextMenu(e) {
		showContextMenu = true;
		pos = { x: e.clientX, y: e.clientY };
	}

    async function handleClick(type) {
        if (selection.length < 300) {
            console.log("testo troppo corto")
            return
        }

        if (type == "sottolinea") {
            let testo_temp = ""

            await assistant_task(selection, type, async (text) => {
                testo_temp += text
            })

            console.log(testo_temp)

            if (testo_temp.charAt(testo_temp.length-1) == ".") 
                testo_temp = testo_temp.slice(-1)
            
            let parole = testo_temp.split(";")

            for (let parola of parole) {
                evidenzia(parola)
            }
        } else {
            editable = false
            removeSelection()

            let primaparte = area.innerHTML.slice(0, window.getSelection().anchorOffset)
            let secondaparte = area.innerHTML.slice(window.getSelection().anchorOffset, area.innerHTML.length)
            await assistant_task(selection, type, async (text) => {
                primaparte += text
                area.innerHTML = primaparte + secondaparte
            })
            editable = true
        }
        
            
    }

    const handlePaste = (e) => {
        area.innerHTML = area.innerHTML.replace(selection, "")
        var text = (e.originalEvent || e).clipboardData.getData('text/plain');
        area.innerHTML += text
    }

    let actions = []
    

	const handleSelectionChange = (e) => (selection = document.getSelection().toString() || selection);

    const handleAssistant = () => {
        showAssistant = true
    }

    const evidenzia = (testo) => {
        area.innerHTML = area.innerHTML.replace(testo, "<span style=\"background-color: yellow; color: black\">" + testo + "</span>")
    }

</script>

<main>
    <div style="width: 100%; height: 100vh; overflow: scroll">
        <ContextMenu {pos} {handleClick} show={showContextMenu}/>

        <h1 class="tx-center">{sheet.label}</h1>
        
        {#if !showAssistant}
            <button id="assistant" on:click={handleAssistant}>
                <i class="fa-solid fa-brain"></i>
            </button>   
        {/if}
        
        <div id="container">
            <div contenteditable={editable ? "true" : "false" }  on:paste|preventDefault={handlePaste} bind:this={area} class="flex-center" autocomplete="on" autocapitalize="off" autofocus="on" autocorrect="off" placeholder="Scrivi testo...">{@html value}</div>
        </div>
    </div>
    
    {#if show_text_format}
        <SelectionMenu {evidenzia}/>
    {/if}

    <AssistantMenu bind:sheet_text={value} bind:show={showAssistant}/>
</main>




<style>
    @import "/app.css";
 
    main {
        display: flex;
        flex-direction: row;
    }

    #container > div {
        display: block;
        width: 87%;
        margin-left: 5%;
        height: 100vh;
        background-color: transparent;
        border: none;
        resize: none;
        font-size: 20px;
        background-color: rgb(38, 38, 38);
        padding: 1.5%;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 7px 30px 0px;
        margin-bottom: 5%;
    }

    #container > div:focus {
        border: none;
        outline: none;
    }

    .fa-brain {
        font-size: 2em;
        color: rgb(105, 105, 105);
    }

    #assistant {
        transition: .3s ease;
        position: absolute;
        right: 7%;
        top: 5%;
        width: 50px;
        height: 50px;
        background-color: rgb(38, 38, 38);
        border-radius: 10px;
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 7px 30px 0px;
    }

    #assistant:hover  {
        background-color: #313131;
    }

   

</style>


<svelte:document on:selectionchange={handleSelectionChange} />

<svelte:window on:click={() => showContextMenu = false} on:contextmenu|preventDefault={handleContextMenu}/>