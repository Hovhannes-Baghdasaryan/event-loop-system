export const defineId = () => {
   let num = 1;

   return (type) => {
       const id = type + `_${num}`
       num++;
       return id
   }
}

export const initCallStack = (eventLoopBlocks, callbackElement) => {
    let index = 0
    
    return () => {
        if(index === eventLoopBlocks.length) return false

        const newCallStackItem = document.createElement("div")

        newCallStackItem.classList.add('callstack-item')
        
        newCallStackItem.innerHTML = eventLoopBlocks[index].element.view
        
        callbackElement.appendChild(newCallStackItem)

        new Function(eventLoopBlocks[index].element.callback)()

        setTimeout(() => {
            newCallStackItem.classList.add('callstack-item-remove')

            setTimeout(() => {
                newCallStackItem.classList.remove('callstack-item')
                newCallStackItem.classList.remove('callstack-item-remove')
                callbackElement.removeChild(newCallStackItem)
            }, 1000)

            index++
        }, 1000)
    }
}

export const getInputValue = (id) => () => document.getElementById(id).value