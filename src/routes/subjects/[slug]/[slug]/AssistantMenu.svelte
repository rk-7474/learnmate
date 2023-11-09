<script>
    import {assistant_task} from './ai_assistant'

    export let show = false;
    export let sheet_text;

    let ai_output = false;
    let output_value = "";
    let input_value = ""

    const assistant_features = [
        {name: "Interrogami", icon: "fa-comments", color: "darkcyan", type: "interroga"},
        {name: "Organizza", icon: "fa-folder-open", color: "purple", type: "organizza"},
        {name: "Sottolinea", icon: "fa-underline", color: "blue", type: "sottolinea"},
        {name: "Approfondisci", icon: "fa-file-pen", color: "darkorange", type: "approfondisci"},
        {name: "Riassumi", icon: "fa-file-lines", color: "olive", type: "approfondisci"},
        {name: "Cerca errori", icon: "fa-triangle-exclamation", color: "red", type: "valida"}]

    const feature = (type) => {
        ai_output = true
        output_value += '\n\n'

        console.log(type)

        if (type == "sottolinea") {
            let testo_temp = ""
            assistant_task(sheet_text, type, async (text) => {
                testo_temp += text
            })

            if (testo_temp.charAt(str.length-1) == ".") 
                testo_temp = testo_temp.slice(-1)
            
            let parole = testo_temp.split(";")

            for (let parola of parole) {
                
            }
            
        
        } else {
            assistant_task(sheet_text, type, async (text) => {
                output_value += text
            })
        }

        
            
    }

    const ask_assistant = () => { 
        ai_output = true 
        output_value += '\n\n'

        assistant_task(input_value, "chat_input", async (text) => {
            output_value += text
        })

        input_value = ""
    }

</script>

<main>
    {#if (show)}
        <div id="container">
            <button id="close" on:click={() => show = false}>
                <i class="fa-solid fa-xmark"></i>
            </button>

            <h2>Assistente AI</h2>
            
            {#if ai_output}
                <button id="home" on:click={() => ai_output = false}>
                    <i class="fa-solid fa-house"></i>
                </button>
            {/if}
            

            {#if ai_output}
                <textarea bind:value={output_value} class="output" disabled="on"/>
            {:else}
                <div class="output home flex-center">
                    {#each assistant_features as {name, icon, color, type} }
                        <div class="trs option flex-center column">
                            <button on:click={(() => feature(type))} class="tx-center feature" style:background-color={color}>
                                <i class="fa-solid {icon}"></i>
                            </button>
                            <span style="margin-top: 10px">{name}</span>
                        </div>    
                    {/each}
                </div>
            {/if}
            
            <form class="input" on:submit|preventDefault={ask_assistant}>
                <input bind:value={input_value}/>
            </form>
        </div>
    {/if}
</main>

<style>

    .option {
        cursor: pointer;
        margin: 10px;
        width: 30%;
    }

    .home {
        flex-wrap: wrap;
    }

    .option:hover {
        transform: translateY(-5px)
    }

    .feature {
        cursor: pointer;
        width: 70px;
        height: 70px;
        border-radius: 100%;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 7px 30px 0px;
        font-size: 180%;
        text-shadow: 1px 1px 2px black,
    }

    #close, #home {
        position: absolute;
        transition: .3s ease;
        margin: 1%;
        font-size: 1.5em;
        width: 50px;
        height: 50px;
        background-color: rgb(38, 38, 38);
        border-radius: 10px;
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 30px 0px;
    }

    #home {
        right: 1%;
    }

    h2 {
        text-align: center;
    }

    .input {
        width: 90%;
        height: 8%;
    }

    .input > input {
        height: 100%;
        width: 100%;
    }

    .output {
        height: 68%;
    }

    .output, textarea, input {
        margin-top: 5%;
        margin-left: 5%;
        border: none;
        resize: none;
        font-size: 20px;
        background-color: rgb(38, 38, 38);
        padding: 1.5%;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 7px 30px 0px;
    }

    textarea:focus, input:focus {
        border: none;
        outline: none;
    }

    #close:hover  {
        background-color: #313131;
    }

    #container {
        display: flex;
        flex-direction: column;
        width: 35vw;
        height: 100vh;
        background-color: rgb(38, 38, 38);
    }
</style>