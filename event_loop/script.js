const delayInput = document.querySelector('.delay')

const inputHandler = function(e) {
    console.log(e.target.value)
    delayInput.value = e.target.value.replace(/[^\d.-]+/g, '')
}

delayInput.addEventListener("change", inputHandler);

