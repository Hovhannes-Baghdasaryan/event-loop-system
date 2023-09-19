let codeEditor = document.getElementById("codeEditor")
let browser = document.getElementById("browser")
let run = document.getElementById('run')
let pTags = Array.from(document.getElementsByClassName('pTag'))
let selectOR = document.getElementById('selectOR')
let selectColor = document.getElementById('selectColor')
let selectTextAlign = document.getElementById('selectTextAlign')
let selectFontFamily = document.getElementById('selectFontFamily')
let selectWidth = document.getElementById('selectWidth')
let hexColor = document.getElementById('hexColor')
let img = browser.querySelector('img')
let divTags = document.getElementsByClassName('divTag')
let animations = {
    "p": () => {
        let i = 0
        let loop = setInterval(() => {
            pTags[i].style.background = "black"
            i++
            if (i > 3) {
                clearInterval(loop)
            }
        }, 1000)
    },
    "div>p": () => {
        let i = 0
        let loop = setInterval(() => {
            pTags[i].style.background = "black"
            i++
            if (i > 3) {
                clearInterval(loop)
                setTimeout(() => {
                    clear()
                    divTags[0].style.background = "lime"
                    divTags[1].style.background = "lime"
                    i = 0
                    loop = setInterval(() => {
                        pTags[i].style.background = "rgb(78, 210, 78)"
                        i++
                        if (i > 2) {
                            clearInterval(loop)
                            pTags[3].style.background = "transparent"
                        }
                    }, 1000)
                }, 1000)
            }
        }, 1000)
    },
    ".item": () => {
        let i = 0
        let loop = setInterval(() => {
            pTags[i].style.background = "black"
            i++
            if (i > 2) {
                clearInterval(loop)
            }
        }, 1000)
    },
    "#myP": () => {
        pTags[3].style.background = "black"
    }
}
let colors = {
    "red": "#FF0000",
    "green": "#00FF00",
    "blue": "#0000FF"
}
run.addEventListener("click", () => {
    browser.style.opacity = "0.3"
    codeEditor.style.opacity = "1"
    clear()
    let elements = document.querySelectorAll("p")
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.color = "black"
        elements[i].style.textAlign = "start"
    }
    hexColor.style.color = "white"

    animations[selectOR.value]()
    hexColor.style.opacity = 0
    let span;
    setTimeout(() => {
        selectColor.style.display = "none"
        hexColor.style.opacity = 1
        span = document.createElement('span')
        span.innerText = "  " + colors[selectColor.value]
        hexColor.append(span)
        hexColor.style.color = selectColor.value
    }, 1000)
    setTimeout(() => {
        browser.style.display = "block"
        browser.style.opacity = "1"
        codeEditor.style.opacity = "0.3"
        let elements = Array.from(browser.querySelectorAll(selectOR.value))

        if (selectOR.value === "div>p") {
            elements = Array.from(browser.querySelectorAll(".div>p"))
        }
        elements.map(el => {
            el.style.color = selectColor.value
            el.style.textAlign = selectTextAlign.value
            el.style.fontFamily = selectFontFamily.value
        })
        img.style.width = selectWidth.value
        clear()
        selectColor.style.display = "inline"
        if (span) {
            span.remove()
        }
    }, 10000)
    setTimeout(() => {
        browser.style.opacity = "1"
        codeEditor.style.opacity = "1"
    }, 14000)
})

function clear() {
    divTags[0].style.background = "transparent"
    divTags[1].style.background = "transparent"
    pTags.map(el => el.style.background = "transparent")
}
