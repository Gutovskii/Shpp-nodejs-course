var plusBtn = document.querySelector('.plus');
var minusBtn = document.querySelector('.minus');
var plusValue = document.querySelector('.plus span');
var minusValue = document.querySelector('.minus span');
var PlusMinus;
(function (PlusMinus) {
    PlusMinus["Plus"] = "+";
    PlusMinus["Minus"] = "-";
})(PlusMinus || (PlusMinus = {}));
function updateValue(sign) {
    var dataToPost = JSON.stringify({
        sign: sign
    });
    fetch('http://localhost:3000/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: dataToPost
    })
        .then(function (res) { return res.json(); })
        .then(function (res) {
        if (res.sign === '+') {
            plusValue.textContent = res.plus;
        }
        if (res.sign === '-') {
            minusValue.textContent = res.minus;
        }
    });
}
plusBtn.addEventListener('click', function () {
    updateValue(PlusMinus.Plus);
});
minusBtn.addEventListener('click', function () {
    updateValue(PlusMinus.Minus);
});
function getValues() {
    fetch('http://localhost:3000/update')
        .then(function (res) { return res.json(); })
        .then(function (res) {
        plusValue.textContent = res.plus;
        minusValue.textContent = res.minus;
    });
}
getValues();
