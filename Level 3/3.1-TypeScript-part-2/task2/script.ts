const plusBtn = document.querySelector('.plus');
const minusBtn = document.querySelector('.minus');

const plusValue = document.querySelector('.plus span');
const minusValue = document.querySelector('.minus span');

enum PlusMinus {
    Plus = '+',
    Minus = '-'
}

function updateValue(sign: PlusMinus) {
    const dataToPost = JSON.stringify({
        sign
    });
    fetch('http://localhost:3000/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: dataToPost
    })
    .then(res => res.json())
    .then(res => {
        if (res.sign === '+') {
            plusValue.textContent = res.plus;
        }
        if (res.sign === '-') {
            minusValue.textContent = res.minus;
        }
    })
}

plusBtn.addEventListener('click', () => {
    updateValue(PlusMinus.Plus);
})
minusBtn.addEventListener('click', () => {
    updateValue(PlusMinus.Minus);
})

function getValues() {
    fetch('http://localhost:3000/update')
    .then(res => res.json())
    .then(res => {
        plusValue.textContent = res.plus;
        minusValue.textContent = res.minus;
    });
}

getValues();