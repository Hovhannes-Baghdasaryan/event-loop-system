import { CodeBlocks } from "./const.js";

// const delayInput = document.querySelector('.delay')
//
// const inputHandler = function(e) {
//     console.log(e.target.value)
//     delayInput.value = e.target.value.replace(/[^\d.-]+/g, '')
// }
//
// delayInput.addEventListener("change", inputHandler);
//

const menu = document.querySelector(".menu")
const codeEditor = document.querySelector(".codeEditor")
const run = document.getElementById("run")
const codeBlocks = [];

menu.addEventListener('click', (e) => {
    const {name} = e.target.dataset

     if(!name || !CodeBlocks[name]) return;

     const {html, values} = CodeBlocks[name]()

     codeBlocks.push(values)

     codeEditor.innerHTML += html
})

run.addEventListener('click', () => {
    let code = ``;

    codeBlocks.map(block => {
        switch (block.type) {
            case "console":
                code += `\n console.log("${block.consoleValue()}")`
                break;

            case "timeout":
                code += `\n setTimeout(() => {
                    console.log("${block.consoleValue()}")
                }, ${Number(block.timeoutValue())})`
                break;

            case "interval":
                code += `\n setInterval(() => {
                    console.log("${block.consoleValue()}")
                }, ${Number(block.intervalValue())})`
                break;

            case "promise":
                code += `\n new Promise((resolve) => {
                        console.log("${block.nestedConsoleValue()}")
            
                        resolve("${block.resolveValue()}")
                    })
                    .then(data => console.log(data))
                    console.log("${block.globalConsoleValue()}")`
                break;
        }
    })

    const execute = new Function(code)
    execute()
})