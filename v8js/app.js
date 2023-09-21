let steps = document.querySelectorAll('.steps>div')
let code = document.getElementById('code')
let fakeCode = document.getElementById('fakeCode')
let run = document.getElementById('run')

run.addEventListener('click', () => {
    let codeLines = code.value.split('\n')
    convertCodeToSpans()
})
let stack = []
let spans = []
let NeedsEnd = 0

function convertCodeToSpans() {
    let codeLines = code.value.split('\n')
    let str = code.value
    code.style.display = "none"
    fakeCode.style.display = "block"
    for (let i = 0; i < codeLines.length; i++) {
        let line = codeLines[i].trimStart()
        line = line.trimEnd()
        for (let j = 0; j < line.length; j++) {
            let line1 = line.split(' ')
            if (line.includes('//')) {
                let span = document.createElement('span')
                span.classList.add('comment')
                span.innerText = codeLines[i]
                span.style.display = 'block'
                spans.push({ text: "Comment Meta", el: span })
                fakeCode.append(span)
                break
            }
            else if (line.startsWith('let ')) {
                let bigSpan = document.createElement('span')
                bigSpan.style.display = "block"
                let span = document.createElement('span')
                span.classList.add('let')
                span.innerText = "let "
                spans.push({ text: "Declaration Meta", el: span })
                bigSpan.append(span)
                span = document.createElement('span')
                span.classList.add('varName')
                span.innerText = line1[1] + " "
                spans.push({ text: "Name Meta", el: span })
                bigSpan.append(span)
                if (line1[2] == "=") {
                    span = document.createElement('span')
                    span.classList.add('white')
                    span.innerText = line1[2] + " "
                    spans.push({ text: "Equal Meta", el: span })
                    bigSpan.append(span)
                }
                if ((!line1[3].startsWith('"') && !line1[3].endsWith('"')) && isNaN(Number(line1[3])) && !line1[3].startsWith('[') && !line1[3].startsWith('{')) {
                    span = document.createElement('span')
                    span.classList.add('varName')
                    span.innerText = line1[3]
                    spans.push({ text: "Value Meta", el: span })
                    bigSpan.append(span)
                    stack.push({
                        name: line1[1],
                        value: line1[3]
                    })
                }
                else {
                    let value = line.split('=')
                    span = document.createElement('span')
                    span.classList.add('varValue')
                    span.innerText = value[1]
                    spans.push({ text: "Value Meta", el: span })
                    bigSpan.append(span)
                    stack.push({
                        name: line1[1],
                        value: value[1]
                    })
                }
                fakeCode.append(bigSpan)
                break
            }
            else if (line.startsWith('console.log(') && line.endsWith(')')) {
                let bigSpan = document.createElement('span')
                bigSpan.style.display = 'block'
                let span = document.createElement('span')
                span.classList.add('varName')
                span.innerText = "console."
                spans.push({ text: "Console Meta", el: span })
                let span2 = document.createElement('span')
                span2.classList.add('foo')
                span2.innerText = "log"
                spans.push({ text: "Log Meta", el: span2 })
                let value = line.split("console.log(")
                let span3 = document.createElement('span')
                if (!value[1].startsWith('"') && isNaN(Number(value[1])) && !value[1].startsWith('[') && !value[1].startsWith('{')) {
                    span3.classList.add('varName')
                }
                else {
                    span3.classList.add('varValue')
                }
                span3.innerText = "(" + value[1]
                spans.push({ text: "Argument Meta", el: span3 })
                bigSpan.append(span)
                bigSpan.append(span2)
                bigSpan.append(span3)
                fakeCode.append(bigSpan)
                break
            }
            else if ((line.startsWith('else if(') && typeof codeLines[i - 1] !== "undefined" && codeLines[i - 1] == "}")
                &&
                ((line.trimEnd().endsWith('{') && line.trimEnd()[line.length - 2] == ")")
                    ||
                    (line.endsWith(')') && typeof codeLines[i + 1] !== "undefined" && codeLines[i + 1].trimStart().startsWith('{'))
                )
            ) {
                NeedsEnd++
                let bigSpan = document.createElement('span')
                bigSpan.style.display = "block"
                let span = document.createElement('span')
                span.classList.add('if')
                span.innerText = "else if"
                spans.push({ text: "Else If Meta", el: span })
                let statement = line.split('else if')[1].split('{')[0]
                let span2 = document.createElement('span')
                span2.classList.add('varName')
                span2.innerText = statement
                spans.push({ text: "Condition Meta", el: span2 })
                let span3 = document.createElement('span')
                span3.classList.add('foo')
                span3.innerText = "{"
                spans.push({ text: "Opening Closure Meta", el: span3 })
                bigSpan.append(span)
                bigSpan.append(span2)
                bigSpan.append(span3)
                fakeCode.append(bigSpan)
                break
            }
            else if (
                line.startsWith('if(') && (line.endsWith('{') && line[line.length - 2] == ")")
                ||
                (line.endsWith(')') && typeof codeLines[i + 1] !== "undefined" && codeLines[i + 1].trimStart().startsWith('{'))
            ) {
                line = line.trimEnd()
                NeedsEnd++
                let bigSpan = document.createElement('span')
                bigSpan.style.display = "block"
                let span = document.createElement('span')
                span.classList.add('if')
                span.innerText = "if"
                spans.push({ text: "If Meta", el: span })
                let statement = line.split('if')[1].split('{')[0]
                let span2 = document.createElement('span')
                span2.classList.add('varName')
                span2.innerText = statement
                spans.push({ text: "Condition Meta", el: span2 })
                let span3 = document.createElement('span')
                span3.classList.add('foo')
                span3.innerText = "{"
                spans.push({ text: "Opening Closure Meta", el: span3 })
                bigSpan.append(span)
                bigSpan.append(span2)
                bigSpan.append(span3)
                fakeCode.append(bigSpan)
                break
            }
            else if (
                line.startsWith('while(') && (line.endsWith(')') && typeof codeLines[i + 1] !== "undefined"
                    && codeLines[i + 1].trimStart().startsWith('{'))
                || (line.startsWith('while(') && line.endsWith('{') && line[line.length - 2] == ")")
            ) {
                NeedsEnd++
                let bigSpan = document.createElement('span')
                bigSpan.style.display = "block"
                let span = document.createElement('span')
                span.classList.add('if')
                span.innerText = "while"
                spans.push({ text: "While Loop Meta", el: span })
                let span2 = document.createElement('span')
                span2.classList.add('varName')
                spans.push({ text: "Condition Meta", el: span2 })
                span2.innerText = line.split('while')[1].split('{')[0]
                let span3 = document.createElement('span')
                span3.classList.add('foo')
                span3.innerText = "{"
                spans.push({ text: "Opening Closure meta", el: span3 })
                bigSpan.append(span)
                bigSpan.append(span2)
                bigSpan.append(span3)
                fakeCode.append(bigSpan)
                break
            }
            else if (line.trimStart().trimEnd() == "}" && NeedsEnd > 0) {
                NeedsEnd--
                let bigSpan = document.createElement('span')
                bigSpan.style.display = "block"
                bigSpan.classList.add("foo")
                bigSpan.innerText = "}"
                spans.push({ text: "Closing Closure Meta", el: bigSpan })
                fakeCode.append(bigSpan)
                break
            }
        }
    }
    console.log(stack)
    let i = 0
    setTimeout(() => {
        steps[0].style.opacity = 1

    }, 2000)
    let tokenizing = setInterval(() => {
        spans[i].el.style.opacity = "0"
        spans[i].el.style.fontSize = "25px"
        setTimeout(() => {
            spans[i].el.innerText = spans[i].text + " "
            spans[i].el.style.opacity = "1"
            i++
        }, 500)
        if (i >= spans.length - 1) {
            steps[0].style.opacity = "0.3"
            clearInterval(tokenizing)
        }
    }, 1000)
}