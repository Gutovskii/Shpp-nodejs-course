"use strict";
function summ(a) {
    var x = Object.keys(a).map(function (k) {
        var elem = a[k];
        if (typeof elem === 'undefined')
            return 2022;
        if (typeof elem.cvalue === 'string')
            return +elem.cvalue || 2022;
        if (typeof elem.cvalue === 'object')
            return summ(elem.cvalue);
        return elem.cvalue;
    });
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i];
    }
    return sum;
}
var a = summ({ hello: { cvalue: 1 }, world: { cvalue: { yay: { cvalue: { ceivo: { cvalue: '5' }, toivo: { cvalue: 'abrakadabra' }, pryvit: { cvalue: 3 } } } } } });
console.log(a); // 2028
var b = summ({ hello: { cvalue: '200' }, draste: { cvalue: 35 } });
console.log(b); // 2023
var c = summ({ hello: undefined });
console.log(c); // 2022
