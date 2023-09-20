import { CodeBlocks } from "./const.js";
import { initCallStack } from "./utils.js";

const menu = document.querySelector(".menu")
const codeEditor = document.querySelector(".codeEditor")
const run = document.getElementById("run")
const callbackElement = document.getElementById("callback_element")
const event_spinner = document.getElementById("event_spinner")

const codeBlocks = [];
const eventLoopBlocks = []

menu.addEventListener('click', (e) => {
    const {name} = e.target.dataset

     if(!name || !CodeBlocks[name]) return;

     const {html, values} = CodeBlocks[name]()

     codeBlocks.push(values)

     codeEditor.innerHTML += html
})

run.addEventListener('click', () => {
    let code = ``;

    callbackElement.innerHTML = ""
    eventLoopBlocks.length = 0
    
    codeBlocks.map(block => {
        switch (block.type) {
            case "console":
                code += `\n console.log("${block.consoleValue()}")`
                const newConsoleItem = {
                    element: {
                        view: `console.log("${block.consoleValue()}")`,
                        callback:`console.log("${block.consoleValue()}")`,
                    }, 
                    type: 'console'
                }
                eventLoopBlocks.push(newConsoleItem)
                break;

            case "timeout":
                const newTimeoutView = `\n setTimeout(() => {
                    console.log("${block.consoleValue()}") 
                }, ${Number(block.timeoutValue())})`

                code += newTimeoutView
                const newTimeoutItem = {
                    element: {
                        callback:`console.log("${block.consoleValue()}")`,
                        delay: Number(block.timeoutValue()),
                        view: newTimeoutView,
                    }, 
                    type: 'timeout'
                }
                eventLoopBlocks.push(newTimeoutItem)
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

    const addCallStack = initCallStack(eventLoopBlocks, callbackElement)

    addCallStack()

    setInterval(() => {
        const callback = addCallStack()

        if(!callback) clearInterval(callback)
    }, 2000)
})



// event_spinner.classList.add('rotate')