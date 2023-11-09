import OpenAI from "openai"

let messages = [{"role": "system", "content": "Ti chiami LearnMate AI e sei un assistente che aiuta gli utenti a imparare."}]
let chiesto = false

const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true
});

const COMMANDS_LIST = {
    "riassumi": "Riassumi il testo",
    "interroga": "Fammi delle domande su questo testo per vedere se lo ho imparato",
    "organizza": "Metti in ordine il testo facendo in modo da formare un discorso completo e corretto",
    "sottolinea": "Scrivi un elenco delle parole o frasi brevi più importanti nel testo separate da un punto e virgola",
    "chat_input": "Rispondi in base alle tue conoscenze",
    "approfondisci": "Riscrivi il testo approfondondendo e aggiungi informazioni coerenti in base alle tue conoscenze.",
    "valuta": "Rispondi dicendomi se le risposte sono corrette in base al testo di prima e correggi i miei errori. Infine dammi un voto",
    "correggi": "Se ci sono presenti informazioni errate in questo testo, correggile.",
    "valida": "Elenca le informazioni errate in questo testo.",
}

export const assistant_task = async (text, type, cb) => {

    let COMMAND;

    switch (type) {
        case "chat_input":
            if (chiesto)
                COMMAND = COMMANDS_LIST["valuta"] 

            chiesto = false
            break       
        case "interroga":
            chiesto = true
        default:
            COMMAND = COMMANDS_LIST[type]        
    }

    messages = [...messages, { role: "user", content: text+"\n\n"+COMMAND }]

    await ask_assistant(cb)
}

const ask_assistant = async (cb) => {
    const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        stream: true,
    });

    for await (const part of stream) {
        cb(part.choices[0]?.delta?.content || "")
    }
}

