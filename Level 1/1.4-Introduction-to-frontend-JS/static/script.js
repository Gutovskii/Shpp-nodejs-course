const blackSquare = document.querySelectorAll('#black')
const deleteBtn = document.querySelector('.delete')

deleteBtn.onclick = () => {
    blackSquare.forEach(square => {
        // square.style.display = 'none'
        // square.parentNode.removeChild(square)
        square.classList.toggle('hidden')
    })
}

const selectorBtn = document.querySelector('.selector-btn')
const selectorInput = document.querySelector('.selector-input')

selectorBtn.onclick = () => {
    if (selectorInput.value === '') {
        blackSquare.forEach(square => {
            square.classList.remove('hidden')
        })
    } else {
        blackSquare.forEach(square => {
            let counter = 0
            square.classList.remove('hidden')
            squareClassList = Array.from(square.classList)
            squareClassList.forEach(selector => {
                if (selectorInput.value !== selector) {
                    counter++
                }
                if (counter === squareClassList.length) {
                    square.classList.add('hidden')
                }
            })
        })
    }
}

const yellowSquare = document.getElementById('yellow')

yellowSquare.onclick = () => {
    alert('Привет')
    yellowSquare.onclick = () => {
        yellowSquare.style.display = 'none'
    }
}

const redSquare = document.getElementById('red')
const showBtn = document.querySelector('.show-btn')

showBtn.onmouseover = () => {
    redSquare.classList.remove('hidden')
}
showBtn.onmouseout = () => {
    redSquare.classList.add('hidden')
}

const greenSquare = document.getElementById('green')
const showInput = document.querySelector('.show-input')

showInput.onfocus = () => {
    greenSquare.classList.remove('hidden')
}
showInput.oninput = () => {
    greenSquare.classList.add('hidden')
}
showInput.onblur = () => {
    greenSquare.classList.add('hidden')
}

const urlInput = document.querySelector('.url-input')
const urlBtn = document.querySelector('.url-btn')
const urlImg = document.querySelector('.url-img')

urlBtn.onclick = () => {
    urlImg.src = urlInput.value
}

const imgTextarea = document.querySelector('.img-textarea')
const imgBtn = document.querySelector('.img-btn')
const imagesContainer = document.querySelector('.images-container')

imgBtn.onclick = () => {
    textareaValues = imgTextarea.value.split('\n')
    textareaValues.forEach(value => {        
        let img = document.createElement('img')
        img.src = value
        imagesContainer.appendChild(img)
    })
}

const mouseInfo = document.querySelector('.mouse-info')
const mouseX = document.querySelector('.mouse-x')
const mouseY = document.querySelector('.mouse-y')
const userLocale = document.querySelector('.user-locale')
const userSh = document.querySelector('.user-sh')
const userD = document.querySelector('.user-d')

document.onmousemove = (event) => {
    mouseX.innerText = `X: ${event.pageX}`
    mouseY.innerText = `Y: ${event.pageY}`
}
userLocale.innerHTML = `Locale: ${navigator.language}`
// navigator.geolocation.getCurrentPosition((position) => {
//     userSh.innerText = `Ш: ${position.coords.latitude}`
//     userD.innerText = `Д: ${position.coords.longitude}`
// })

const localStorageTextarea = document.querySelector('.localStorage-textarea')
const cookieTextarea = document.querySelector('.cookie-textarea')
const sessionCookieTextarea = document.querySelector('.sessionCookie-textarea')

localStorageTextarea.value = localStorage.getItem('localStorageTextarea')
cookieTextarea.value = getCookie('cookieTextarea')
sessionCookieTextarea.value = sessionStorage.getItem('sessionStorageTextarea')

localStorageTextarea.oninput = () => {
    localStorage.setItem('localStorageTextarea', localStorageTextarea.value)
}
cookieTextarea.oninput = () => {
    setCookie('cookieTextarea', cookieTextarea.value)
}
sessionCookieTextarea.oninput = () => {
    sessionStorage.setItem('sessionStorageTextarea', sessionCookieTextarea.value)
}

const onTopBtn =  document.querySelector('.on-top')

onTopBtn.onclick = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
}

window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
        onTopBtn.classList.remove('unvisible')
    } else {
        onTopBtn.classList.add('unvisible')
    }
}

const blueSquare = document.getElementById('blue')
const orangeSquare = document.getElementById('orange')

blueSquare.onclick = () => {
    alert('I am a blue square')
}
orangeSquare.onclick = () => {
    alert('I am an orange square!')
}
orangeSquare.addEventListener('click', (event) => event.stopPropagation())

const openModalBtn = document.querySelector('.open-modal')
const modalDiv = document.querySelector('.modal')

modalDiv.classList.add('unvisible')

openModalBtn.onclick = () => {
    modalDiv.classList.add('visible')
    modalDiv.classList.remove('unvisible')
    document.body.style.overflow = 'hidden'
}
modalDiv.onclick = () => {
    modalDiv.classList.remove('visible')
    modalDiv.classList.add('unvisible')
    document.body.style.overflow = ''
}

const formDisabled = document.querySelector('.form-disabled')

formDisabled.onsubmit = () => false

const inputFile = document.querySelector('.input-file')

inputFile.ondragenter = () => {
    inputFile.style.background = 'orange'
}
inputFile.ondragleave = () => {
    inputFile.style.background = ''
}
inputFile.ondrop = () => {
    inputFile.style.background = 'red'
}
