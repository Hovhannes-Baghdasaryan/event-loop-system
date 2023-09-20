import { defineId, getInputValue } from "./utils.js";

const uniqueId = defineId();

export const CodeBlocks = {
    settimeout: () => {

        const consoleId = uniqueId("console")
        const timeoutId = uniqueId("timeout")

        return {
            html: `<pre>
                setTimeout(() => {
                    console.log(<input class="text" id=${consoleId} />)
                }, <input class="delay" id=${timeoutId} />)
            </pre>
            `,

            values: {
                type: "timeout",
                consoleValue: getInputValue(consoleId),
                timeoutValue: getInputValue(timeoutId)
            }
        }
    },
    setinterval: () => {

        const consoleId = uniqueId("console")
        const intervalId = uniqueId("interval")

        return {
            html: `<pre>
                setInterval(() => {
                    console.log(<input class="text" id=${consoleId} />)
                }, <input class="delay" id=${intervalId} />)
            </pre>
            `,

            values: {
                type: "interval",
                consoleValue: getInputValue(consoleId),
                intervalValue: getInputValue(intervalId)
            }
        }
    },
    promise: () => {
        const nestedConsoleId = uniqueId("console")
        const resolveId = uniqueId("promise")
        const globalConsoleId = uniqueId("console")


        return {
            html: `
                <pre>
                    new Promise((resolve) => {
                        console.log(<input class="text" id=${nestedConsoleId}  />)
            
                        resolve(<input class="text" id=${resolveId} />)
                    })
                    .then(data => console.log(data))
                    console.log(<input class="text" id=${globalConsoleId} />)
                </pre>
            `,

            values: {
                type: "promise",
                nestedConsoleValue: getInputValue(nestedConsoleId),
                resolveValue: getInputValue(resolveId),
                globalConsoleValue: getInputValue(globalConsoleId)
            }
        }
    },

    console: () => {
        const id = uniqueId("console")

        return {
            html: `
                <pre>
                   console.log(<input class="text" id=${id} />)
                </pre>    
            `,
            values: {
                consoleValue: getInputValue(id),
                type: "console"
            }
        }
    }
}