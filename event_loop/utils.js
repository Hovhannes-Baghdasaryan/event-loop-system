export const defineId = () => {
   let num = 1;

   return (type) => {
       const id = type + `_${num}`
       num++;
       return id
   }
}

export const getInputValue = (id) => () => document.getElementById(id).value